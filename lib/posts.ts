import { readFile } from "fs/promises";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

const postsDirectory = join(process.cwd(), "posts");

interface Options {
  autoLinkHeadings?: boolean;
}

export async function getPostBySlug(
  filePath: string,
  { autoLinkHeadings = true }: Options = {}
): Promise<{
  mdxSource: MDXRemoteSerializeResult;
  data: { [key: string]: any };
}> {
  const fullPath = join(postsDirectory, filePath);
  try {
    const fileContents = await readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    // TODO: Properly type this
    const rehypePlugins = [];

    if (autoLinkHeadings) {
      rehypePlugins.push(rehypeSlug);
      rehypePlugins.push([
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: {
            type: "element",
            tagName: "svg",
            properties: {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 36 36",
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: {
                  fill: "#8899A6",
                  d: "M15 9l6-6s6-6 12 0 0 12 0 12l-8 8s-6 6-12 0c-1.125-1.125-1.822-2.62-1.822-2.62l3.353-3.348S14.396 18.396 16 20c0 0 3 3 6 0l8-8s3-3 0-6-6 0-6 0l-3.729 3.729s-1.854-1.521-5.646-.354L15 9z",
                },
              },
              {
                type: "element",
                tagName: "path",
                properties: {
                  fill: "#8899A6",
                  d: "M20.845 27l-6 6s-6 6-12 0 0-12 0-12l8-8s6-6 12 0c1.125 1.125 1.822 2.62 1.822 2.62l-3.354 3.349s.135-1.365-1.469-2.969c0 0-3-3-6 0l-8 8s-3 3 0 6 6 0 6 0l3.729-3.729s1.854 1.521 5.646.354l-.374.375z",
                },
              },
            ],
          },
        },
      ]);
    }

    return {
      data,
      mdxSource: await serialize(content, {
        // @ts-ignore
        mdxOptions: { rehypePlugins },
      }),
    };
  } catch {
    return { data: {}, mdxSource: await serialize("") };
  }
}
