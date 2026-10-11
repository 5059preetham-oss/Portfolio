# Preetham's portfolio

This is a static portfolio built with [Next.js](https://nextjs.org), MDX, and
[Once UI](https://once-ui.com). The site is deployed automatically to GitHub
Pages from the `main` branch.

## Run it locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` while the development server is running.

## Add your content

The portfolio content lives in `src/resources/content.tsx`. Update the name,
role, links, introduction, and verified experience there. Add projects as MDX
files under `src/app/work/projects`; the files are automatically included in
the Work page. Add blog posts under `src/app/blog/posts` and enable the Blog
route in `src/resources/once-ui.config.ts` when you have posts to publish.

The default Open Graph artwork in `public/images/og/portfolio.svg` is an original abstract
portfolio graphic. Replace it with an image you own when you are ready.
Do not add private keys or credentials to this repository.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds the static site and
publishes it whenever changes land on `main`.

One repository setting is required the first time:

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Push to `main` or run the **Deploy to GitHub Pages** workflow manually.

The current project URL is:
`https://5059preetham-oss.github.io/Portfolio/`

If the repository is renamed, update `NEXT_PUBLIC_BASE_PATH` and
`NEXT_PUBLIC_SITE_URL` in `.github/workflows/deploy-pages.yml`.

## Build locally

```bash
npm run build
```

The static output is written to `out/`.
