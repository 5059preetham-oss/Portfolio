import { Column, Meta, Schema } from "@once-ui-system/core";
import { BlogShowcase } from "@/components/blog/BlogShowcase";
import { baseURL, blog, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `${baseURL}/images/og/portfolio.svg`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <Column fillWidth paddingTop="24" horizontal="center">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`${baseURL}/images/og/portfolio.svg`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BlogShowcase />
    </Column>
  );
}
