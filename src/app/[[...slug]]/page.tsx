import { createRelativeLink } from "fumadocs-ui/mdx";

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/layout/docs/page";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { A } from "@/modules/mdx-components/a";

export default async function Page(props: PageProps<"/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) redirect("/zypher");

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle className="font-mono">{page.data.title}</DocsTitle>
      <DocsDescription className="text-sm text-text-med">
        {page.data.description}
      </DocsDescription>
      <DocsBody>
        <MDXContent
          className="prose prose-sm"
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page, A),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const params = source.generateParams();
  
  // For optional catch-all routes with static export, we must include the root path
  // Filter out any existing root paths to avoid duplicates
  const filteredParams = params.filter((p) => p.slug && p.slug.length > 0);
  
  // Return root path first, then all other paths
  return [{ slug: [] }, ...filteredParams];
}

export async function generateMetadata(
  props: PageProps<"/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
