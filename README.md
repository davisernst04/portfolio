# Davis Ernst Portfolio

Personal portfolio website for Davis Ernst, a Software Developer and Computer Science student at the University of Saskatchewan.

## Stack

- **Next.js 16.4.6** (App Router, Turbopack)
- **React 19.3.1**
- **TypeScript 7.0.2** — native compiler for `tsc`, with the TypeScript 6.0.2 API sidecar (`@typescript/typescript6`) for tooling that still needs the JS API (typescript-eslint, Next.js type checking)
- **Tailwind CSS 4.3.5**
- **shadcn/ui** + Radix UI primitives
- **Motion 14.14.0** for draggable card animations
- **lucide-react** + **react-icons** for icons
- **next-themes** for dark/light mode

Dependencies were refreshed to their latest compatible stable releases on
November 16, 2026. ESLint remains on 9.39.5 because `eslint-plugin-react`, used
by `eslint-config-next`, does not yet declare ESLint 10 support. Keep the
TypeScript compiler/API aliases above until the lint and build tooling supports
the TypeScript 7 API. Use `npm ci` to reproduce the versions in the lockfile;
avoid `--force` or `--legacy-peer-deps` when upgrading.

## Features

- Responsive single-page portfolio (hero, projects, contact)
- Dark and light theme support
- SEO-oriented metadata, structured data (JSON-LD), sitemap and robots routes
- Security headers configured in `next.config.ts`, without a request-time proxy

## Performance

The site uses shared motion timings for the hero entrance, project rows,
expanding panels, hover states, footer, and theme crossfades. The aurora moves
small pre-rendered WebP textures on a fixed viewport layer, avoiding live blur,
masks, blend modes, and repeated gradient painting. It keeps looping while
scrolling and while projects expand. Theme crossfades use the View Transition
API, with an immediate fallback in older browsers.

Hero content stays readable throughout its CSS entrance instead of waiting for
JavaScript to reveal it. Static WebP imports provide inline blur placeholders
so images never leave an empty frame while loading. Project previews begin
loading at low priority as the list approaches the viewport. Panel contents
stay mounted for smooth expansion and collapse, with staggered image and text
transitions and a fade-only reduced-motion alternative. Offscreen content uses
one-time reveals and remains readable with JavaScript disabled.

A local headless Chromium comparison at 1440 × 1000 (dark theme, full motion,
warmed images) measured these average animation-frame intervals. Lower is
better; these are local measurements rather than a device-wide frame-rate guarantee.

| Motion workload | Before | After |
| --- | --- | --- |
| Ambient background | 85.7 ms | 18.7 ms |
| Opening/closing projects | 127.0 ms | 19.8 ms |

Earlier local production measurements with Lighthouse 13.6 (simulated mobile and desktop):

| Metric | Mobile before → after | Desktop before → after |
| --- | --- | --- |
| Performance score | 75 → 90 | 98 → 100 |
| Largest contentful paint | 4.4 s → 3.2 s | 1.0 s → 0.6 s |
| Total blocking time | 400 ms → 200 ms | 80 ms → 10 ms |
| Initial transfer | 589 KiB → 293 KiB | 637 KiB → 288 KiB |

Optimized images and the Latin WOFF2 font are included, so normal builds do
not require Python or external font downloads. After changing an original
image or font, regenerate the web copies with:

```bash
python -m pip install Pillow 'fonttools[woff]'
python scripts/optimize-assets.py
```

Regenerate the ambient textures after changing their palette with
`python scripts/generate-aurora.py` (Pillow only). All four WebP variants are
included in the repository, so production builds do not generate them.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/davisernst04/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Project Structure

```text
portfolio/
├── public/            # static assets (photos, fonts, resume)
└── src/
    ├── app/           # App Router entry points (layout, page, sitemap, robots)
    ├── components/    # site components
    │   ├── home/      # homepage sections
    │   └── ui/        # shadcn/ui primitives
    ├── hooks/
    └── lib/
```

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm start` - run the production build
- `npm run lint` - run ESLint
- `npm run lint:fix` - fix lint issues where possible

## Deployment

The project deploys cleanly to Vercel, but it can also be self-hosted:

```bash
npm run build
npm start
```

## License

MIT
