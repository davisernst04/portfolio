# Davis Ernst Portfolio

Personal portfolio website for Davis Ernst, a Software Developer and Computer Science student at the University of Saskatchewan.

## Stack

- **Next.js 16.4.6** (App Router, Turbopack)
- **React 19.3.1**
- **TypeScript 7.0.2** — native compiler for `tsc`, with the TypeScript 6.0.2 API sidecar (`@typescript/typescript6`) for tooling that still needs the JS API (typescript-eslint, Next.js type checking)
- **Tailwind CSS 4.3.5**
- **shadcn/ui** + Radix UI primitives
- **Motion 14.14.0** for the `/aurora-demo` entrance animation
- **lucide-react** + **react-icons** for icons
- **next-themes** for dark/light mode

Dependencies were refreshed to their latest compatible stable releases on
November 16, 2026. ESLint remains on 9.39.5 because `eslint-plugin-react`, used
by `eslint-config-next`, does not yet declare ESLint 10 support. Keep the
TypeScript compiler/API aliases above until the lint and build tooling supports
the TypeScript 7 API. Use `npm ci` to reproduce the versions in the lockfile;
avoid `--force` or `--legacy-peer-deps` when upgrading.

## Features

- Responsive single-page portfolio: a hero that flows into an expandable project
  list, followed by a footer with social and email links
- Dark and light themes with View Transition crossfades
- Aceternity aurora background mapped to the cream/navy theme tokens, with a
  standalone preview at `/aurora-demo`
- SEO-oriented metadata, structured data (JSON-LD), sitemap and robots routes
- Security headers configured in `next.config.ts`, without a request-time proxy

## Performance

The site uses shared motion timings for the hero entrance, project rows,
expanding panels, hover states, footer, and theme crossfades. The aurora is the
Aceternity `AuroraBackground` component, with its gradients drawn from the
application's theme colors and its loop driven by the `--animate-aurora`
Tailwind theme animation. Theme crossfades use the View Transition API, with an
immediate fallback in older browsers.

The hero plays a short CSS-only entrance (it also runs without JavaScript), the hero portrait is preloaded, and the theme switch grows the new theme in a circle from the toggle. Static WebP imports
provide inline blur placeholders so images never leave an empty frame while
loading. Project previews begin loading at low priority as the list approaches
the viewport, and the open project's preview is promoted to high priority. Panel
contents stay mounted for smooth expansion and collapse, with staggered image and
text transitions and a fade-only reduced-motion alternative. There are no scroll
reveals, so all content is visible with JavaScript disabled and in print.

### Earlier measurements

These local measurements predate the switch to the current Aceternity aurora.
They were taken when the background moved small pre-rendered WebP textures, so
the ambient-background figures do not describe the current implementation.

A local headless Chromium comparison at 1440 × 1000 (dark theme, full motion,
warmed images) measured these average animation-frame intervals. Lower is
better; these are local measurements rather than a device-wide frame-rate guarantee.

| Motion workload | Before | After |
| --- | --- | --- |
| Ambient background | 85.7 ms | 18.7 ms |
| Opening/closing projects | 127.0 ms | 19.8 ms |

Local production measurements with Lighthouse 13.6 (simulated mobile and desktop):

| Metric | Mobile before → after | Desktop before → after |
| --- | --- | --- |
| Performance score | 75 → 90 | 98 → 100 |
| Largest contentful paint | 4.4 s → 3.2 s | 1.0 s → 0.6 s |
| Total blocking time | 400 ms → 200 ms | 80 ms → 10 ms |
| Initial transfer | 589 KiB → 293 KiB | 637 KiB → 288 KiB |

### Assets

Optimized images and the Latin WOFF2 font are included, so normal builds do
not require Python or external font downloads. After changing an original
image or font, regenerate the web copies with:

```bash
python -m pip install Pillow 'fonttools[woff]'
python scripts/optimize-assets.py
```

Add new images to the script's source list first.

`scripts/generate-aurora.py` (Pillow only) and the four `aurora-*.webp` textures
in `public/photos/optimized/` are kept as an unused alternative to the current
aurora. Production builds do not generate them.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/davisernst04/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm ci
```

Use `npm install` only when intentionally updating dependencies, and commit the
lockfile changes.

### 3. Start the development server

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Project Structure

```text
portfolio/
├── docs/              # dated project catalog and deployment notes
├── public/            # static assets (photos, fonts, resume)
├── scripts/           # asset optimization (Python, run manually)
└── src/
    ├── app/           # App Router entry points (layout, page, /aurora-demo, sitemap, robots)
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

There is no automated test suite. Run `npm run lint && npm run build` before
opening a pull request.

## Deployment

The project deploys cleanly to Vercel, but it can also be self-hosted:

```bash
npm run build
npm start
```

## License

MIT
