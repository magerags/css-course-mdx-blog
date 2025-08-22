import React, { cache } from "react";
import BlogHero from "@/components/BlogHero";
import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";
import dynamic from "next/dynamic";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);

export const getBlogData = cache(loadBlogPost);

export async function generateMetadata({ params }) {
  const post = await getBlogData(params.postSlug);

  return {
    title: `${post.frontmatter.title} - ${BLOG_TITLE}`,
    description: post.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const post = await getBlogData(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={post.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
