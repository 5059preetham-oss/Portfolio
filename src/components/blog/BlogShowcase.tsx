"use client";

import styles from "./BlogShowcase.module.scss";

const posts = [
  {
    slug: "portfolio-website",
    category: "Web development",
    title: "Building this portfolio as a learning project",
    excerpt: "A look at the decisions behind a static Next.js portfolio and the lessons from refining it for GitHub Pages.",
    image: "/images/projects/project-01/cover-01.jpg",
    content:
      "This portfolio is a learning project: a place to document progress while studying at PES University. I used Next.js, React, TypeScript, MDX, and Sass, then configured a static export for GitHub Pages. The most useful lessons have been keeping routes predictable, checking the generated output, and making the interface responsive without relying on fixed desktop coordinates.",
  },
  {
    slug: "unity",
    category: "Game development",
    title: "Learning interactive experiences with Unity",
    excerpt: "Notes from exploring scenes, interaction, and the foundations of game development as a student.",
    image: "/images/projects/project-01/cover-02.jpg",
    content:
      "Unity is one of my current learning areas. I am focusing on understanding scenes, game objects, interaction, and the small iterations that make an experience feel responsive. These experiments are study work rather than professional releases, and this blog is where I can record what I learn next.",
  },
  {
    slug: "blender",
    category: "3D modeling",
    title: "Finding a 3D workflow in Blender",
    excerpt: "Exploring modeling, asset creation, and how 3D work can support game-development ideas.",
    image: "/images/projects/project-01/cover-03.jpg",
    content:
      "Blender is helping me understand the process behind a 3D asset, from the first shape to a usable model. I am still building fundamentals: modeling, materials, and a repeatable workflow. The goal is steady practice and better documentation, not claiming finished professional production work.",
  },
];

export function BlogShowcase() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className={styles.blogShowcase} aria-labelledby="blog-heading">
      <p className={styles.eyebrow}>Learning notes / 001—003</p>
      <h1 id="blog-heading">DISCOVER, LEARN, THRIVE</h1>
      <p className={styles.intro}>
        Honest notes from a student portfolio: experiments, tools, and the ideas I am
        learning through.
      </p>
      <div className={styles.grid}>
        {posts.map((post) => (
          <article className={styles.card} key={post.slug}>
            <img
              src={`${basePath}${post.image}`}
              alt=""
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.cardBody}>
              <p className={styles.category}>{post.category}</p>
              <h2>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <details className={styles.details}>
                <summary>Read article</summary>
                <div className={styles.articleBody}>{post.content}</div>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
