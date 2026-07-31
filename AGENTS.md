# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 portfolio using the App Router, React 19, TypeScript, and Tailwind CSS.

- `src/app/` contains routes, layouts, global styles, SEO metadata, sitemap, and robots configuration.
- `src/components/home/` contains page sections such as the hero, projects, and contact areas.
- `src/components/ui/` contains reusable shadcn/ui and Radix-based primitives.
- `src/hooks/` and `src/lib/` hold shared hooks, utilities, and structured-data helpers.
- `public/` stores static photos, fonts, icons, and the downloadable résumé.

Use the `@/` alias for imports from `src`, for example `@/components/ui/button`.

## Build, Test, and Development Commands

- `npm install` installs the locked dependencies from `package-lock.json`.
- `npm run dev` starts the Turbopack development server at `http://localhost:3000`.
- `npm run lint` checks the repository with ESLint and Next.js Core Web Vitals rules.
- `npm run lint:fix` applies safe automatic lint fixes.
- `npm run build` creates a production build and catches type or rendering errors.
- `npm start` serves the completed production build.

Before opening a pull request, run `npm run lint && npm run build`.

## Coding Style & Naming Conventions

Write strict TypeScript and functional React components. Follow the existing two-space indentation, double quotes, semicolons, and trailing commas in multiline constructs. Name React component files and exports in PascalCase (`ProjectsSection.tsx`), hooks with a `use-` prefix (`use-outside-click.tsx`), and utilities in lowercase. Keep route files aligned with Next.js conventions such as `page.tsx` and `layout.tsx`.

Prefer Tailwind utility classes and existing design tokens over new one-off CSS. Reuse components from `src/components/ui/` before introducing another primitive. Add `"use client"` only when browser APIs, state, or effects require it.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Treat linting and a successful production build as required checks. Manually verify affected sections in both light and dark themes, at mobile and desktop widths. Check navigation, external links, image loading, keyboard focus, and contact interactions when relevant.

## Commit & Pull Request Guidelines

Recent history mixes concise imperative summaries with Conventional Commit prefixes. Prefer focused messages such as `feat: add project filter` or `fix: correct profile link`; use `Revert "..."` for reversions. Keep unrelated changes in separate commits.

Pull requests should explain the user-visible change, list verification performed, and link any related issue. Include before-and-after screenshots for layout, styling, or responsive changes, and call out new assets, dependencies, or configuration.
