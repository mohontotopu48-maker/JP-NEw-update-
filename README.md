# JP Stucco Repair

> Orange County's Most Referred Stucco Professional

A high-performance, conversion-optimized landing page for **JP Stucco Repair** — a premium stucco restoration company serving the Orange County coastal communities for over 25 years.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)
![License](https://img.shields.io/badge/License-Private-red)

---

## 🏠 Overview

This is a single-page landing website designed with Apple-style minimalist aesthetics and a deep ocean blue + electric coastal teal color palette. It educates Orange County homeowners about hidden stucco damage (moisture barriers, black mold, weep screed failure) and converts them into free assessment bookings.

### Key Features

- **Responsive Design** — Mobile-first, optimized for all screen sizes
- **Smooth Scroll Navigation** — Anchor-based section navigation with animated transitions
- **Services Dropdown** — Desktop and mobile dropdown menu for stucco repair services
- **Framer Motion Animations** — Scroll-triggered fade-up animations throughout
- **SEO Optimized** — JSON-LD structured data, Open Graph meta, semantic HTML
- **Performance First** — Lazy-loaded images, minimal JavaScript bundle
- **Accessibility** — ARIA labels, keyboard navigation, semantic HTML structure

---

## 📁 Project Structure

```
jp-stucco-repair/
├── public/                     # Static assets
│   ├── jp-logo.png            # Company logo
│   ├── hero-home.png          # Hero section image
│   ├── stucco-damage.png      # Damage showcase image
│   └── robots.txt             # Search engine directives
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with fonts, metadata, JSON-LD
│   │   ├── page.tsx           # Main landing page (all sections)
│   │   ├── globals.css        # Global styles, Tailwind config, custom scrollbar
│   │   ├── sitemap.ts         # Dynamic sitemap generation
│   │   └── api/
│   │       └── route.ts       # API health check endpoint
│   ├── components/
│   │   └── ui/                # shadcn/ui component library
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utility functions and database client
├── prisma/
│   └── schema.prisma          # Database schema (SQLite)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

---

## 🎨 Design System

### Color Palette

| Token           | Hex       | Usage                           |
| --------------- | --------- | ------------------------------- |
| Deep Ocean Blue | `#0A2540` | Primary brand, headers, CTAs    |
| Electric Teal   | `#00C9A7` | Accents, highlights, buttons    |
| Crimson Red     | `#DC2626` | Warnings, structural alerts     |
| White           | `#FFFFFF` | Backgrounds, cards              |
| Gray-50         | `#F9FAFB` | Alternating section backgrounds |

### Typography

- **Headlines**: Playfair Display (serif) — elegance and authority
- **Body**: Inter (sans-serif) — clean readability

### Page Sections

1. **Header** — Fixed navigation with logo, nav links, services dropdown, phone CTA
2. **Hero** — Split-screen: "Stucco Repair Done Right." + video thumbnail + metric bar
3. **Hidden Danger** — Educational deep-dive: mold, moisture barriers, insurance traps
4. **How It Works** — 3-step process: Free Walkthrough → Estimate → Done
5. **Stucco Patching Services** — Cosmetic vs Structural comparison grid
6. **Weep Screed Authority** — Educational section about weep screed damage & code
7. **Assessment/Pricing** — 2×2 service pricing cards with selection state
8. **Pre-Footer CTA** — Final conversion banner
9. **Footer** — 4-column layout with services, tools, contact, service areas

---

## 🛠 Tech Stack

### Frontend

| Technology     | Version | Purpose                          |
| -------------- | ------- | -------------------------------- |
| Next.js        | 16      | React framework (App Router)     |
| React          | 19      | UI library                       |
| TypeScript     | 5       | Type safety                      |
| Tailwind CSS   | 4       | Utility-first styling            |
| Framer Motion  | 12      | Scroll & transition animations   |
| Lucide React   | 0.525+  | Icon library                     |
| shadcn/ui      | Latest  | Pre-built UI components          |

### Backend

| Technology     | Version | Purpose                          |
| -------------- | ------- | -------------------------------- |
| Next.js API    | 16      | Serverless API routes            |
| Prisma         | 6       | ORM (SQLite client)              |
| z-ai-web-dev-sdk | 0.0.17 | AI integration SDK              |

### Infrastructure

| Service        | Purpose                          |
| -------------- | -------------------------------- |
| Vercel         | Hosting & deployment             |
| GitHub         | Source control                   |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/mohontotopu48-maker/JP-NEw-update-.git

# Navigate to the project directory
cd JP-NEw-update-

# Install dependencies
bun install

# Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `bun run dev`      | Start development server (port 3000)     |
| `bun run build`    | Create production build                  |
| `bun run start`    | Start production server                  |
| `bun run lint`     | Run ESLint code quality checks           |
| `bun run db:push`  | Push Prisma schema to database           |
| `bun run db:generate` | Generate Prisma client                |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width    | Layout                          |
| ---------- | -------- | ------------------------------- |
| Mobile     | < 640px  | Single column, hamburger menu   |
| Tablet     | 640-1023px | Two-column grids              |
| Desktop    | 1024px+  | Full layout, expanded nav       |

---

## 🔗 Navigation Anchors

| Section        | Anchor ID      | Route                     |
| -------------- | -------------- | ------------------------- |
| Hero           | `#hero`        | Stucco Repair overview    |
| Patching       | `#patching`    | Stucco Patches services   |
| Weep Screed    | `#weep-screed` | Weep Screed repair info   |
| Assessment     | `#assessment`  | Pricing & booking CTA     |

---

## 📞 Contact Information

- **Phone**: 714-936-7013
- **Service Area**: Orange County Coastal communities
- **Hours**: Free on-site assessments available

---

## 📄 License

This project is private and proprietary. All rights reserved by JP Stucco Repair.

---

*Built with ❤️ by [VSUALdigitalmedia](https://vsualdigitalmedia.com/) · Powered by NXLBYLDR CRM*
