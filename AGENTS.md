# Repository Guidelines

## Project Structure & Module Organization

This is Davis Ernst's single-page portfolio, built with Next.js 16.4 (App Router), React 19.3, TypeScript 7, and Tailwind CSS 4.3. Refer to `package.json` and `package-lock.json` for exact dependency versions.

- `src/app/` contains routes, layouts, global styles, SEO metadata, sitemap, and robots configuration.
- `src/components/home/` contains `HeroSection`, `ProjectsSection`, and `Footer`, composed in `src/app/page.tsx`. The hero flows directly into the projects section.
- `src/components/` contains shared site components, including `NavigationBar`, `ThemeProvider`, `ModeToggle`, `Reveal`, and `ProjectList`. Project content lives in the `projects` array in `ProjectList.tsx`.
- `src/components/ui/` contains reusable shadcn/ui and Radix-based primitives.
- `src/hooks/` and `src/lib/` hold shared hooks, utilities, and structured-data helpers.
- `public/` stores static photos, fonts, icons, and the downloadable résumé.
- `scripts/optimize-assets.py` generates WebP images in `public/photos/optimized/` and the local Latin WOFF2 font.

Use the `@/` alias for imports from `src`, for example `@/components/ui/button`.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependencies from `package-lock.json` for a clean, reproducible setup. Use `npm install` when intentionally updating dependencies, and include lockfile changes.
- `npm run dev` starts the Turbopack development server at `http://localhost:3000`.
- `npm run lint` checks the repository with ESLint and Next.js Core Web Vitals rules.
- `npm run lint:fix` applies safe automatic lint fixes.
- `npm run build` creates a production build and catches type or rendering errors.
- `npm start` serves the completed production build.

Before opening a pull request, run `npm run lint && npm run build`.

The package setup uses the TypeScript 7 native compiler via `@typescript/native`, with the `typescript` package aliased to `@typescript/typescript6` for tools that need the JavaScript API. Preserve this arrangement when updating tooling.

ESLint stays on the latest compatible 9.x release because `eslint-plugin-react` (used by `eslint-config-next`) does not yet declare ESLint 10 support. Check the full plugin peer dependency chain before upgrading it; do not bypass compatibility checks with `--force` or `--legacy-peer-deps`.

## Coding Style & Naming Conventions

Write strict TypeScript and functional React components. Follow the existing two-space indentation, double quotes, semicolons, and trailing commas in multiline constructs. Name React component files and exports in PascalCase (`ProjectsSection.tsx`), hooks with a `use-` prefix (`use-outside-click.tsx`), and utilities in lowercase. Keep route files aligned with Next.js conventions such as `page.tsx` and `layout.tsx`.

Prefer Tailwind utility classes and existing design tokens over new one-off CSS. Reuse components from `src/components/ui/` before introducing another primitive. Add `"use client"` only when browser APIs, state, or effects require it.

## Rendering, Styling, and Assets

- Theme tokens and Tailwind configuration live in `src/app/globals.css`. Preserve the cream/navy light and dark palettes and local Times typography unless a design change is requested.
- Keep the Aceternity aurora geometry and motion faithful to the supplied source, with colors mapped to the application’s cream/navy theme tokens. The standalone `/aurora-demo` route previews the themed component. The portfolio caller overrides height/alignment to fit its content and places foreground content above the effect. The sticky header matches the solid theme background; aurora must not show through it.
- Shared motion timings and easing live in `src/app/globals.css`. Keep the hero readable throughout its initial CSS entrance. `Reveal` progressively enhances offscreen project rows and the footer with one-time transitions; it leaves content visible without JavaScript and reveals keyboard-focused content.
- Theme changes crossfade viewport snapshots with the View Transition API, with an immediate fallback on unsupported browsers. Preserve focus and the final theme when toggles interrupt a transition.
- The sticky header contains only the theme switch on all screen sizes. The hero flows directly into the project list without a visible Projects heading. Keep section anchor targets outside transformed reveal wrappers; `/#home` and `/#projects` remain available for incoming fragment links, with `scroll-padding-top` matching the header's 65px height.
- Use static image imports with `next/image`, blur placeholders, meaningful alt text, and accurate responsive `sizes`. Preserve the hero portrait preload. Keep project panel contents mounted for smooth first-open and closing transitions; previews load at low priority as the list approaches the viewport, with the active preview promoted to high priority.
- Project panels use a fade-only transition under reduced motion, including a fade before collapsing on close. Do not remove all panel transitions in this mode; keep spatial transforms disabled.
- Keep original photos and `public/fonts/times.ttf`. After changing source assets, run `python -m pip install Pillow 'fonttools[woff]'` and `python scripts/optimize-assets.py`; update the script's source list for new images. Include regenerated web assets in the change. Normal builds do not need Python.
- `scripts/generate-aurora.py` and the generated ambient WebP textures are retained as an unused alternative. The current aurora uses application theme colors with the Aceternity utilities, with `--animate-aurora` registered in the Tailwind theme.
- Security headers and allowed remote image hosts are configured in `next.config.ts`.
- Keep identity, profile links, and site URLs consistent across page content, layout metadata, and `src/lib/structured-data.ts`. `NEXT_PUBLIC_BASE_URL` overrides the default `https://davisernst.com` for sitemap and robots output only.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Treat linting and a successful production build as required checks for code changes; documentation-only edits can be checked with `git diff --check` and a review against the source.

Manually verify affected sections in both light and dark themes, at mobile and desktop widths. When relevant, check:

- Theme switching and keyboard focus on mobile and desktop, plus direct hash loads below the sticky header.
- Project panel expansion/collapse, keyboard focus, and inaccessible focus targets in closed panels.
- Image loading, résumé download, social links, and email links in the hero and footer.
- Reduced-motion behavior and content visibility before hydration or with JavaScript disabled. The supplied Aceternity source has no reduced-motion handling: its demo entrance and aurora loop continue under reduced motion. Preserve source behavior unless asked to change it.

## Commit & Pull Request Guidelines

Recent history mixes concise imperative summaries with Conventional Commit prefixes. Prefer focused messages such as `feat: add project filter` or `fix: correct profile link`; use `Revert "..."` for reversions. Keep unrelated changes in separate commits.

Pull requests should explain the user-visible change, list verification performed, and link any related issue. Include before-and-after screenshots for layout, styling, or responsive changes, and call out new assets, dependencies, or configuration.

Check `git status` before editing and preserve unrelated work already in the working tree. Report checks actually performed and any verification that remains incomplete.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
