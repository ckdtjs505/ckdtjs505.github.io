import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

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
  return allPostsData.sort((a, b) => {
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
  
  console.log(`[DEBUG] getPostData slug: "${slug}" -> decoded: "${decodedSlug}"`);
  
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

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  let contentHtml = processedContent.toString();

  // remark-html은 코드블록 내용을 HTML 이스케이프함 (& → &amp;, > → &gt; 등)
  // Mermaid가 이를 파싱하면 Syntax error 발생하므로, 서버에서 직접 디코딩 후 data-source 속성에 저장
  contentHtml = contentHtml.replace(
    /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
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
    contentHtml,
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

