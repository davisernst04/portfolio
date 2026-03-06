# Davis Ernst Portfolio

A modern, full-stack portfolio website built with Next.js 15, featuring a personal showcase of projects and professional information.

## 🚀 Features

- **Portfolio Showcase**: Responsive homepage with hero section, about, and projects
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
- **Animations**: Motion
- **Theme**: next-themes

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

3. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── NavigationBar.tsx
│   │   └── ProjectCards.tsx
│   └── lib/              # Utilities
│       ├── structured-data.ts
│       └── utils.ts      # Helper functions
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🎨 Key Pages

- **/** - Portfolio homepage with hero, about, and projects

## 🎯 Best Practices Implemented

### Code Quality
- ✅ TypeScript strict mode enabled
- ✅ ESLint configured for Next.js
- ✅ Consistent component structure
- ✅ Server/Client component separation

### Performance
- ✅ Static page generation where possible
- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading

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
