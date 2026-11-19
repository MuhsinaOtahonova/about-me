# About me

My personal site: projects, skills, photos and contact, in English, Turkish and Uzbek.

Live: https://muhsinaotahonova.github.io/about-me/

Built with my design system ([my-design-template](https://github.com/MuhsinaOtahonova/my-design-template)): `packages/tokens` and `packages/ui-web` are copied from it.

## Edit the content

All text, links, projects, skills and photos are in **`apps/site/src/content.ts`**. Lines marked `TODO` are placeholders.

- Photo: put `me.jpg` in `apps/site/public/` and set `photo: "me.jpg"`.
- Project screenshots live in `apps/site/public/projects/`.

## Run locally

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # output in apps/site/dist
```

Every push to `main` deploys to GitHub Pages (Settings → Pages → Source: GitHub Actions).
