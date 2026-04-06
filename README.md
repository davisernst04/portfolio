# Davis Ernst Portfolio

Personal website and writing platform built with Next.js. The site combines a portfolio, a blog section called Corner, and a private dashboard for managing posts.

## Overview

This project is designed to serve as both a public portfolio and a lightweight content system. It includes:

- a portfolio homepage for projects and background
- a blog with individual post pages
- an authenticated dashboard for creating, editing, and publishing posts
- responsive theming and modern UI components

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- React

## Features

- Responsive portfolio layout
- Blog post publishing workflow
- Protected admin dashboard
- GitHub OAuth authentication
- Dark and light theme support
- SEO-oriented page metadata and site structure

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

### 3. Configure environment variables

```bash
cp .env.example .env
```

Update `.env` with the required values:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
ADMIN_GITHUB_ID=your-github-user-id
```

For GitHub OAuth setup details, see [`docs/GITHUB_OAUTH_SETUP.md`](docs/GITHUB_OAUTH_SETUP.md).

### 4. Prepare the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the development server

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Project Structure

```text
portfolio/
├── prisma/
├── public/
├── src/
│   ├── actions/
│   ├── app/
│   ├── components/
│   └── lib/
├── .env.example
└── package.json
```

## Key Routes

- `/` - portfolio homepage
- `/corner` - blog index
- `/corner/post/[slug]` - individual blog post
- `/corner/dashboard` - admin dashboard
- `/corner/sign-in` - authentication page

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm start` - run the production build
- `npm run lint` - run ESLint
- `npm run lint:fix` - fix lint issues where possible

## Deployment

The project is intended to deploy cleanly to Vercel, but it can also be self-hosted:

```bash
npm run build
npm start
```

Make sure the database and environment variables are configured for the target environment.

## License

MIT
