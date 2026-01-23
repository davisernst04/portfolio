# Davis Ernst Portfolio

A modern, full-stack portfolio website built with Next.js 15, featuring a personal blog ("Corner"), project showcase, and admin dashboard.

## 🚀 Features

- **Portfolio Showcase**: Responsive homepage with hero section, about, and projects
- **Blog System**: Full-featured blog with markdown support and image uploads
- **Admin Dashboard**: Secure authentication with post management (create, edit, delete, publish/draft)
- **Dark/Light Mode**: Theme toggle with system preference detection
- **SEO Optimized**: Structured data, meta tags, and sitemap generation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Modern UI**: shadcn/ui components with smooth animations

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes

### Backend
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth with GitHub OAuth
- **Validation**: Zod schemas
- **API**: Next.js Server Actions & Route Handlers

### Developer Experience
- **Linting**: ESLint with Next.js config
- **Type Safety**: Strict TypeScript
- **Hot Reload**: Turbopack (dev mode)
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
ADMIN_GITHUB_ID=your-github-user-id
```

See [docs/GITHUB_OAUTH_SETUP.md](docs/GITHUB_OAUTH_SETUP.md) for detailed setup instructions.

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── actions/          # Server Actions
│   │   └── posts.ts      # Blog post CRUD operations
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── corner/       # Blog section
│   │   │   ├── dashboard/  # Admin dashboard
│   │   │   ├── post/       # Individual posts
│   │   │   └── sign-in/    # Authentication
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Editor.tsx    # Markdown editor
│   │   ├── NavigationBar.tsx
│   │   └── ProjectCards.tsx
│   └── lib/              # Utilities
│       ├── auth.ts       # Auth configuration
│       ├── prisma.ts     # Database client
│       └── utils.ts      # Helper functions
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── .env.example          # Environment template
└── package.json          # Dependencies
```

## 🎨 Key Pages

- **/** - Portfolio homepage with hero, about, and projects
- **/corner** - Blog post listings with featured post
- **/corner/post/[slug]** - Individual blog post pages
- **/corner/dashboard** - Admin dashboard (authenticated)
- **/corner/sign-in** - Authentication page

## 🔒 Authentication & Security

The admin dashboard uses GitHub OAuth with single-user access control:
- **GitHub OAuth**: Secure authentication via your GitHub account
- **Access Control**: Only the specified GitHub account (via `ADMIN_GITHUB_ID`) can access the dashboard
- **Session Management**: Secure, database-backed sessions
- **Automatic Protection**: Middleware enforces authentication on all dashboard routes

### How It Works:
1. **Sign In**: Click "Continue with GitHub" on the sign-in page
2. **Authorize**: Approve the OAuth app on GitHub (first time only)
3. **Access Control**: System verifies your GitHub ID matches `ADMIN_GITHUB_ID`
4. **Dashboard Access**: If authorized, you're redirected to the dashboard

For detailed setup instructions, see [docs/GITHUB_OAUTH_SETUP.md](docs/GITHUB_OAUTH_SETUP.md).

## 📝 Blog Management

The dashboard provides full blog post management:
- **Create**: Rich markdown editor with image URL support
- **Edit**: Update published or draft posts
- **Delete**: Confirmation dialog for safety
- **Publish/Draft**: Toggle post visibility
- **Preview**: View posts before publishing

## 🎯 Best Practices Implemented

### Code Quality
- ✅ TypeScript strict mode enabled
- ✅ ESLint configured for Next.js
- ✅ Consistent component structure
- ✅ Server/Client component separation
- ✅ Zod validation for all inputs

### Performance
- ✅ Static page generation where possible
- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading
- ✅ Optimized bundle sizes

### SEO
- ✅ Metadata API for all pages
- ✅ Structured data (JSON-LD)
- ✅ Semantic HTML
- ✅ Sitemap and robots.txt
- ✅ Open Graph tags

### Accessibility
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support

### Security
- ✅ Environment variables for secrets
- ✅ Input validation and sanitization
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection
- ✅ Secure password hashing

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Self-Hosted
```bash
npm run build
npm start
```

Ensure your PostgreSQL database is accessible and environment variables are set.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use!

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio.

## 👤 Author

**Davis Ernst**
- Email: davis.ernst@outlook.com
- GitHub: [davisernst04](https://github.com/davisernst04)
- LinkedIn: [davis-ernst-987391362](https://linkedin.com/in/davis-ernst-987391362)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
