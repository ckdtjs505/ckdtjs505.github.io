import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), '_posts');

function generateSafeSlug(fileName) {
  const rawSafeSlug = fileName.replace(/\.md$/, '').replace(/\[|\]/g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
  return rawSafeSlug;
}

export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Create a URL-safe id
      const id = generateSafeSlug(fileName);

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Generate a simple excerpt from the markdown content
      const excerpt = matterResult.content
        .replace(/#+\s/g, '') // headers
        .replace(/\*\*|__/g, '') // bold
        .replace(/\*|_/g, '') // italic
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // links
        .replace(/!\[([^\]]+)\]\([^\)]+\)/g, '') // images
        .replace(/```[\s\S]*?```/g, '') // code blocks
        .replace(/`[^`]+`/g, '') // inline code
        .replace(/<[^>]+>/g, '') // html tags
        .replace(/\n+/g, ' ') // newlines to spaces
        .trim();
      
      let finalExcerpt = '';
      if (matterResult.data.summary) {
        finalExcerpt = matterResult.data.summary;
      } else {
        const maxLength = 150;
        finalExcerpt = excerpt.length > maxLength 
          ? excerpt.substring(0, maxLength) + '...' 
          : excerpt;
      }

      // Combine the data with the id
      return {
        id,
        excerpt: finalExcerpt,
        ...matterResult.data,
      };
    });

  // Sort posts by date
  // draft: true인 글은 목록·피드·태그에서 제외
  return allPostsData.filter((post) => !post.draft).sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .filter((fileName) => !matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8')).data.draft)
    .flatMap((fileName) => {
      const slug = generateSafeSlug(fileName);
      const encodedSlug = encodeURIComponent(slug);
      
      const params = [{ params: { slug } }];
      if (slug !== encodedSlug) {
        params.push({ params: { slug: encodedSlug } });
      }
      return params;
    });
}

export async function getPostData(slug) {
  const fileNames = fs.readdirSync(postsDirectory);
  
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
    if (decodedSlug !== decodeURIComponent(decodedSlug)) {
      decodedSlug = decodeURIComponent(decodedSlug);
    }
  } catch (e) {
    // Ignore decode errors
  }
  const matchedFileName = fileNames.find(fileName => {
    const rawSafeSlug = fileName.replace(/\.md$/, '').replace(/\[|\]/g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
    return rawSafeSlug === decodedSlug || rawSafeSlug === slug || encodeURIComponent(rawSafeSlug) === slug;
  });
  
  if (!matchedFileName) {
    console.error(`[DEBUG] Failed to match slug: "${slug}". Available raw slugs:`, fileNames.map(f => f.replace(/\.md$/, '').replace(/\[|\]/g, '-').replace(/\s+/g, '-').replace(/-+/g, '-')));
    throw new Error(`Post not found for slug: ${slug}`);
  }
  
  const fullPath = path.join(postsDirectory, matchedFileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // 코드 하이라이트·헤딩 id를 빌드 타임에 처리 (mermaid는 아래에서 다이어그램으로 변환하므로 하이라이트 제외)
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeHighlight, { detect: true, plainText: ['mermaid'] })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content);
  let contentHtml = processedContent.toString();

  // remark-html은 코드블록 내용을 HTML 이스케이프함 (& → &amp;, > → &gt; 등)
  // Mermaid가 이를 파싱하면 Syntax error 발생하므로, 서버에서 직접 디코딩 후 data-source 속성에 저장
  contentHtml = contentHtml.replace(
    /<pre><code class="[^"]*language-mermaid[^"]*">([\s\S]*?)<\/code><\/pre>/g,
    (match, encodedContent) => {
      // 1단계: HTML 엔티티 디코딩
      let decodedContent = encodedContent
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

      // 2단계: Mermaid v11은 특수문자(&, (, ), /, :)가 있는 label을 큰따옴표로 감싸야 파싱 가능
      // node label [텍스트] 처리
      decodedContent = decodedContent.replace(
        /\[([^\]"]+)\]/g,
        (m, label) => {
          if (/[&()/:.]/.test(label)) {
            // Mermaid v11에서 따옴표 내부의 & 는 &amp; 로 써야 정상 렌더링
            const safeLabel = label.replace(/&/g, '&amp;').replace(/"/g, '\\"');
            return `["${safeLabel}"]`;
          }
          return m;
        }
      );

      // edge label |텍스트| 처리
      decodedContent = decodedContent.replace(
        /\|([^|"]+)\|/g,
        (m, label) => {
          if (/[&()/:.]/.test(label)) {
            const safeLabel = label.replace(/&/g, '&amp;').replace(/"/g, '\\"');
            return `|"${safeLabel}"|`;
          }
          return m;
        }
      );

      return `<div class="mermaid-block" data-source="${encodeURIComponent(decodedContent)}"></div>`;
    }
  );

  // Combine the data with the id and contentHtml
  return {
    slug,
    id: generateSafeSlug(matchedFileName),
    contentHtml,
    toc: extractToc(contentHtml),
    readingMinutes: estimateReadingMinutes(matterResult.content),
    ...matterResult.data,
  };
}

export function getAllTags() {
  const allPosts = getSortedPostsData();
  const tags = new Set();
  
  allPosts.forEach(post => {
    if (post.tags) {
      const postTags = typeof post.tags === 'string' ? post.tags.split(' ') : post.tags;
      postTags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags).flatMap(tag => {
    const encodedTag = encodeURIComponent(tag);
    const params = [{ params: { tag } }];
    if (tag !== encodedTag) {
      params.push({ params: { tag: encodedTag } });
    }
    return params;
  });
}

export function getPostsByTag(tag) {
  const allPosts = getSortedPostsData();
  const decodedTag = decodeURIComponent(tag);
  
  return allPosts.filter(post => {
    if (!post.tags) return false;
    const postTags = typeof post.tags === 'string' ? post.tags.split(' ') : post.tags;
    return postTags.includes(decodedTag) || postTags.includes(tag);
  });
}

function extractToc(contentHtml) {
  const headings = [];
  const headingRegex = /<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g;
  let match;
  while ((match = headingRegex.exec(contentHtml)) !== null) {
    headings.push({
      depth: Number(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim(),
    });
  }
  return headings;
}

// 한국어 기술 글 기준 분당 약 500자로 계산
function estimateReadingMinutes(markdown) {
  const charCount = markdown.replace(/\s+/g, '').length;
  return Math.max(1, Math.round(charCount / 500));
}

export function getAdjacentPosts(id) {
  const allPosts = getSortedPostsData();
  const index = allPosts.findIndex((post) => post.id === id);
  if (index === -1) return { previous: null, next: null };

  // 목록은 최신순이므로 index + 1이 더 오래된(이전) 글
  return {
    previous: allPosts[index + 1] ?? null,
    next: allPosts[index - 1] ?? null,
  };
}

export function getSeriesPosts(series) {
  if (!series) return [];
  return getSortedPostsData()
    .filter((post) => post.series === series)
    .sort((a, b) => new Date(a.date) - new Date(b.date) || a.id.localeCompare(b.id));
}

export function getTagCounts() {
  const counts = new Map();
  getSortedPostsData().forEach((post) => {
    if (!post.tags) return;
    const postTags = typeof post.tags === 'string' ? post.tags.split(' ') : post.tags;
    postTags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });

  return Array.from(counts, ([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
