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

- **Page composition:** `src/app/page.tsx` is a server component that emits two JSON-LD scripts (from `src/lib/structured-data.ts`) and an `AuroraBackground` that wraps a `max-w-lg` centered column of `HeroSection`, `ProjectsSection`, and `Footer` in a `relative z-10` layer above the effect.
- **Theme:** one fixed navy/cream palette on `:root`. `layout.tsx` puts the `dark` class on `<html>` only so the aurora's `dark:` utilities apply. There is no theme switcher or `next-themes`.
- **Client/CSS split for motion:** components only set class names and data attributes (`motion-link`, `project-trigger`, `aria-expanded`, `data-open`, etc.). Panel transitions, hover motion, timings, and reduced-motion variants all live in `src/app/globals.css`. Change motion there, not with inline styles.
- **Project content:** to add or change a project, edit the `projects` array at the bottom of `src/components/ProjectList.tsx`. A project has a title, description, technology icons, and optional preview and links. The list handles overflow within the fixed-height page.
- **Unused/demo code:** `BentoDemo.tsx`, `DraggableCards.tsx`, and their `ui/` primitives (`bento-grid`, `draggable-card`) are not used on the homepage. `aurora-background-demo.tsx` backs only the `/aurora-demo` route.
- **`docs/`:** dated records of past catalog reviews and deployments, not current state.
