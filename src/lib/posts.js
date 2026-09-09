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

      // Combine the data with the id
      return {
        id,
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
    .map((fileName) => {
      return {
        params: {
          slug: generateSafeSlug(fileName),
        },
      };
    });
}

export async function getPostData(slug) {
  const fileNames = fs.readdirSync(postsDirectory);
  const decodedSlug = decodeURIComponent(slug);
  
  const matchedFileName = fileNames.find(fileName => {
    const rawSafeSlug = fileName.replace(/\.md$/, '').replace(/\[|\]/g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
    return rawSafeSlug === decodedSlug || rawSafeSlug === slug;
  });
  
  if (!matchedFileName) {
    throw new Error(`Post not found for slug: ${slug}`);
  }
  
  const fullPath = path.join(postsDirectory, matchedFileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

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
  
  return Array.from(tags).map(tag => ({
    params: {
      tag: tag
    }
  }));
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

