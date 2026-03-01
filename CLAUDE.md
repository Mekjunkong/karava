# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Karava (คารวะ) is a premium funeral service platform for Chiang Mai, Thailand. It's a bilingual (Thai/English) Next.js application with Supabase backend, deployed on Vercel.

## Commands

- `pnpm dev` — Start development server
- `pnpm build` — Production build (use to verify changes compile)
- `pnpm lint` — Run ESLint
- `pnpm start` — Start production server locally

## Architecture

### Stack
- **Next.js 16** (App Router, Turbopack) with TypeScript strict mode
- **Tailwind CSS 4** with custom theme in `src/app/globals.css`
- **Supabase** (PostgreSQL + Auth + RLS) — project in ap-southeast-1
- **next-intl** for i18n (Thai default, English secondary)
- **framer-motion** for animations
- **Vercel** for hosting

### Routing & i18n

All pages live under `src/app/[locale]/`. The locale segment (`th` or `en`) is handled by next-intl middleware. Thai is the default locale.

- **Routing config**: `src/i18n/routing.ts` — defines locales and default
- **Navigation helpers**: `src/i18n/navigation.ts` — use `Link`, `redirect`, `useRouter` from here (NOT from `next/link` or `next/navigation`)
- **Translation files**: `messages/th.json` and `messages/en.json` — all UI text lives here
- **Middleware**: `src/middleware.ts` — chains next-intl routing with Supabase session refresh

### Supabase Integration

Three client variants in `src/lib/supabase/`:
- `client.ts` — browser client (`createBrowserClient`)
- `server.ts` — server component client (`createServerClient` with cookies)
- `middleware.ts` — middleware client for session refresh

All guard against missing env vars (graceful fallback when Supabase isn't configured).

**Database types**: `src/lib/database.types.ts` — typed schema for 8 tables: `packages`, `services`, `staff`, `inquiries`, `orders`, `order_services`, `order_timeline`, `testimonials`

**Migrations**: `supabase/migrations/` — schema SQL with RLS policies
**Seed data**: `supabase/seed.sql`

### Bilingual Data Pattern

Database tables use `_th` / `_en` suffixed columns (e.g., `name_th`, `name_en`). Use `getLocalizedField(item, "name", locale)` from `src/lib/utils.ts` to retrieve the correct localized value. Falls back to Thai.

### Component Organization

- `src/components/ui/` — Reusable primitives (Button, Card, Badge, Input, Logo, motion wrappers)
- `src/components/home/` — Homepage sections (hero, packages-overview, process-summary, testimonials, why-karava, inquiry-cta)
- `src/components/layout/` — Header and Footer (shared across all pages)
- `src/components/packages/` — Package card, inquiry form
- `src/components/contact/` — Inquiry form, contact content
- `src/components/about/`, `process/`, `services/` — Inner page content (client components for animations)
- `src/components/admin/` — Admin dashboard components

### Client vs Server Component Pattern

Pages (`src/app/[locale]/*/page.tsx`) are **server components** for SEO metadata generation. They delegate rendering to client components in `src/components/*/` (needed for framer-motion animations and `useTranslations`).

### Design System

Custom color palette defined in `src/app/globals.css` via `@theme`:
- **Primary**: `#2D2D2D` (Deep Charcoal) — text, headings
- **Secondary**: `#B8963E` (Warm Gold) — CTAs, accents, brand color
- **Background**: `#FAF8F5` (Soft Cream)
- **Accent**: `#C4A0A0` (Lotus Pink)
- **Success**: `#7B9E87` (Sage Green)

Three fonts: Sarabun (Thai body), Cormorant Garamond (serif headings via `font-serif`), Inter (fallback).

### Utility CSS Classes

Defined in `globals.css`: `.font-serif`, `.text-gold-gradient`, `.shadow-gold`, `.shadow-gold-lg`, `.card-gold-top`, `.photo-zoom`, `.animate-hero-zoom`

### SEO

`src/lib/seo.ts` — generates per-page metadata and Schema.org FuneralHome JSON-LD. Uses `generatePageMetadata(page, locale)`.

### Environment Variables

Required in `.env.local` and Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Admin Routes

`/[locale]/admin/*` — protected admin pages for managing inquiries, orders, packages, services, and staff. Uses Supabase Auth.

## Key Conventions

- Use `@/*` path alias for imports (maps to `src/*`)
- Price formatting: `formatPrice(amount)` returns Thai-formatted number with ฿ symbol
- All animation components use `"use client"` directive
- Stock photos in `public/images/` — use Next.js `<Image>` component for all images
- Package slugs map to photos via `packageImages` record in `packages-overview.tsx` and `package-card.tsx`
