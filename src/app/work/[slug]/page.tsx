import { notFound } from "next/navigation";
import {
  Column,
  Heading,
  Meta,
  Schema,
  Text,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { CustomMDX } from "@/components";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";

const getProjects = () => getPosts(["src", "app", "work", "projects"]);

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((item) => item.slug === slug);

  if (!project) return {};

  return Meta.generate({
    title: project.metadata.title,
    description: project.metadata.summary,
    baseURL,
    image: project.metadata.image || `${baseURL}/images/og/home.jpg`,
    path: `${work.path}/${project.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjects().find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <Column as="section" maxWidth="s" horizontal="center" gap="l" paddingY="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${work.path}/${project.slug}`}
        title={project.metadata.title}
        description={project.metadata.summary}
        image={`${baseURL}/images/og/home.jpg`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
        }}
      />
      <Column gap="16" horizontal="center" align="center">
        <Text variant="label-strong-m" onBackground="brand-weak">
          {project.metadata.tag}
        </Text>
        <Heading variant="display-strong-m" align="center">
          {project.metadata.title}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="center">
          {project.metadata.summary}
        </Text>
      </Column>
      <Column as="article" gap="m">
        <CustomMDX source={project.content} />
      </Column>
    </Column>
  );
}
