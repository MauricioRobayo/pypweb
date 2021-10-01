import { readFile } from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";

const postsDirectory = join(process.cwd(), "posts");

export default async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  try {
    const content = await readFile(fullPath, "utf8");

    return serialize(content, {
      mdxOptions: {
        // @ts-ignore
        rehypePlugins: [rehypeSanitize, rehypeSlug, rehypeAutolinkHeadings],
      },
    });
  } catch (e) {
    return "";
  }
}
