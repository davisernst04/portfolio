# Davis Ernst Portfolio

Personal portfolio website for Davis Ernst, a Software Developer and Computer Science student at the University of Saskatchewan.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 7** — native compiler for `tsc`, with the TypeScript 6 API sidecar (`@typescript/typescript6`) for tooling that still needs the JS API (typescript-eslint, Next.js type checking)
- **Tailwind CSS 4**
- **shadcn/ui** + Radix UI primitives
- **Motion** for animations
- **lucide-react** + **react-icons** for icons
- **next-themes** for dark/light mode

## Features

- Responsive single-page portfolio (hero, about, projects, contact)
- Dark and light theme support
- SEO-oriented metadata, structured data (JSON-LD), sitemap and robots routes
- Security headers via Next.js proxy (`src/proxy.ts`)

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
