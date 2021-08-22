import { readFile } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");

export default async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  try {
    const fileContents = await readFile(fullPath, "utf8");
    const { content } = matter(fileContents);
    return content;
  } catch (e) {
    return "";
  }
}
