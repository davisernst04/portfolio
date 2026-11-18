# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

`AGENTS.md` (imported above) is the authoritative guide for structure, commands, style, rendering rules, and verification. Notes below add context that takes reading several files to piece together.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000
- `npm run lint` / `npm run lint:fix`
- `npm run build` — production build; also the only type check (there is no separate `tsc` script)
- Required before a PR: `npm run lint && npm run build`. There is no test framework, so there are no single-test commands.

## Architecture notes

- **Page composition:** `src/app/page.tsx` is a server component that emits two JSON-LD scripts (from `src/lib/structured-data.ts`), the sticky `NavigationBar`, and an `AuroraBackground` that wraps `HeroSection`, `ProjectsSection`, and `Footer` in a `relative z-10` layer above the effect.
- **Theme:** `ThemeProvider` wraps `next-themes` (`attribute="class"`, system default) in `layout.tsx`. `ModeToggle` drives `document.startViewTransition` itself. It sets the reveal-circle CSS variables from the button's position, then uses a request-id ref so only the latest click applies a theme or clears pending state, and it falls back to an immediate `setTheme` if the API is missing or snapshot capture fails. Keep that guard logic intact when editing.
- **Client/CSS split for motion:** components only set class names and data attributes (`motion-link`, `project-trigger`, `aria-expanded`, `data-open`, etc.). Panel transitions, hover motion, timings, and reduced-motion variants all live in `src/app/globals.css`. Change motion there, not with inline styles.
- **Project content:** to add or change a project, edit the `projects` array at the bottom of `src/components/ProjectList.tsx`. Preview images are static imports from `public/photos/optimized/*.webp`, so a new image must first be added to `scripts/optimize-assets.py` and regenerated. `ProjectList` uses an IntersectionObserver (300px margin) to start loading previews before the list reaches the viewport.
- **Unused/demo code:** `BentoDemo.tsx`, `DraggableCards.tsx`, and their `ui/` primitives (`bento-grid`, `draggable-card`) are not used on the homepage. `aurora-background-demo.tsx` backs only the `/aurora-demo` route.
- **`docs/`:** dated records of past catalog reviews and deployments, not current state.
