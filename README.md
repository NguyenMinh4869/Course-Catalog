# Sonic Course Catalog

A modern, responsive course catalog application for learning blockchain and DeFi development on the Sonic platform.

## Features

-  **Course Catalog**: Browse courses with pagination support
-  **Search & Filter**: Find courses by difficulty level and keywords
-  **Pagination**: Handle large course catalogs efficiently (8 courses per page)
-  **Load More**: Alternative loading pattern for better UX
-  **Dark/Light Theme**: Toggle between themes
-  **Responsive Design**: Works on desktop, tablet, and mobile
-  **Modern UI**: Built with Next.js 14 and Tailwind CSS
-  **Test Coverage**: Comprehensive test suite with Jest

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Testing**
- **TypeScript**
- **Fonts**: Geist, Montserrat, Open Sans

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report


## Structure

```text
.
├─ app/                # Next.js App Router pages/layouts and global styles
├─ components/         # UI components and feature modules (catalog, filter, cards)
├─ data/               # JSON data sources for courses and continue-learning
├─ lib/                # Utilities and shared helpers (colors, utils)
├─ hooks/              # Custom React hooks
├─ types/              # TypeScript types/interfaces
├─ public/             # Static assets (images, icons)
├─ scripts/            # Development scripts
├─ __tests__/          # Test docs and notes
├─ coverage/           # Jest coverage reports (auto-generated)
├─ jest.*              # Jest config and setup files
├─ tsconfig*.json      # TypeScript configuration
├─ postcss.config.mjs  # PostCSS configuration
├─ next.config.mjs     # Next.js configuration
└─ package.json        # Project metadata and scripts
```


## Links

- **Live Demo**: [https://course-catalog-pi.vercel.app/](https://course-catalog-pi.vercel.app/)
- **Figma Design**: [https://www.figma.com/design/LNwLbU71rEpSwj6GB2bQoG/Course-Catalog?node-id=6-4&t=asL6Me7jeETIgOH7-0](https://www.figma.com/design/LNwLbU71rEpSwj6GB2bQoG/Course-Catalog?node-id=6-4&t=asL6Me7jeETIgOH7-0)


