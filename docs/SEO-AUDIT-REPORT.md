# SEO Audit Report — 63 Agency

**Date:** 2025  
**Scope:** Next.js 14 App Router, next-intl (fr/en), 63agency.ma

---

## Phase 1 — Current State

### 1. Layouts & metadata

| File | Current state | Priority |
|------|----------------|----------|
| `src/app/layout.tsx` | Root layout is minimal (no html/body, no metadata). No `metadataBase`. | **Critical** |
| `src/app/[locale]/layout.tsx` | Has static `metadata` (title template, description, icons, verification). No `generateMetadata()`, no hreflang in head, no JSON-LD. | **Critical** |

### 2. Pages metadata

| Page | Metadata | Missing | Priority |
|------|----------|---------|----------|
| Home `/[locale]` | `generateMetadata`: title, description, keywords, OG, Twitter, alternates (canonical + languages en/fr), robots. | x-default hreflang; OG type; stronger B2B keywords; JSON-LD | **High** |
| About `/[locale]/about` | **None** — no `generateMetadata`, no metadata export. | Full metadata, canonical, hreflang, FAQ schema, BreadcrumbList | **Critical** |
| Contact layout `/[locale]/contact` | `generateMetadata` for /contact (title, description, OG, alternates, robots). | Applies to thank-you too — thank-you must be noindex | **Critical** |
| Thank-you `/[locale]/contact/thank-you` | Inherits contact layout metadata (index: true). | **Must be noindex** (robots: noindex, nofollow) | **Critical** |

### 3. Sitemap & robots

| Asset | Exists? | Priority |
|-------|---------|----------|
| `src/app/sitemap.ts` | **No** | **Critical** |
| `src/app/robots.ts` | **No** | **Critical** |

### 4. Structured data (JSON-LD)

| Schema | Exists? | Priority |
|--------|---------|----------|
| Organization | No | **Critical** |
| WebSite (+ SearchAction) | No | **High** |
| ProfessionalService (home) | No | **High** |
| FAQPage (about) | No | **High** |
| BreadcrumbList | No | **Medium** |

### 5. International SEO

| Item | Current | Missing | Priority |
|------|---------|---------|----------|
| Hreflang | `alternates.languages` in metadata (en, fr) | x-default; hreflang link tags in `<head>` (Next may emit from alternates) | **High** |
| x-default | Not set | Should point to fr (primary) | **High** |
| Per-locale metadata | Home + contact have locale-aware titles/descriptions | About has none | **Critical** |

### 6. Open Graph / Social

| Item | Current | Missing | Priority |
|------|---------|---------|----------|
| og:type | Not set | "website" | **Medium** |
| og:image | Home has /images/og-63agency.jpg | About/contact may need explicit images; 1200x630 | **Medium** |
| og:locale:alternate | Not set | Other locale | **Medium** |
| twitter:site | Not set | @63agency (or actual) | **Low** |

### 7. Performance & images

| Item | Current | Priority |
|------|----------|----------|
| Hero/Founder images | Use next/image | Add `priority={true}` for LCP | **High** |
| CardNav logo | Raw `<img>` | Prefer next/image (or keep if dynamic external) | **Medium** |
| Other sections | next/image used in multiple components | Audit alt text, sizes, lazy | **Medium** |

### 8. On-page

| Item | Status | Priority |
|------|--------|----------|
| Single H1 per page | To verify in HeroSection, About, Thank-you | **High** |
| Heading hierarchy | To verify | **Medium** |
| Internal links | Home ↔ About ↔ #contact present | OK |
| CTA "Réservez un appel" | Linked to #contact | OK |

---

## Priority summary

- **Critical:** Root/locale metadata strategy, About metadata, thank-you noindex, sitemap.ts, robots.ts, Organization JSON-LD.
- **High:** Home metadata (x-default, B2B copy), WebSite + ProfessionalService JSON-LD, FAQPage, hreflang x-default, LCP priority on images.
- **Medium:** OG type/images, BreadcrumbList, image audit (CardNav, alt/sizes).
- **Low:** twitter:site, font preconnect, optional AggregateRating if data exists.

---

## Files created/modified (implementation complete)

| File | Status |
|------|--------|
| `src/app/layout.tsx` | ✅ metadataBase added |
| `src/app/[locale]/layout.tsx` | ✅ Organization + WebSite JSON-LD in head |
| `src/app/[locale]/page.tsx` | ✅ Home metadata (B2B, x-default, og:type) + ProfessionalService JSON-LD |
| `src/app/sitemap.ts` | ✅ Created – fr/en, /about, exclude thank-you |
| `src/app/robots.ts` | ✅ Created – allow /, disallow thank-you, sitemap URL |
| `src/app/[locale]/about/page.tsx` | ✅ generateMetadata + BreadcrumbList + FAQPage JSON-LD |
| `src/app/[locale]/contact/thank-you/layout.tsx` | ✅ Created – robots noindex, nofollow |
| `src/app/[locale]/contact/layout.tsx` | ✅ og:type, x-default, alternateLocale |
| `src/components/seo/JsonLd.tsx` | ✅ Created – reusable JSON-LD component |
| `src/components/sections/FounderSection.tsx` | ✅ priority on founder image (LCP) |
| `messages/fr.json` & `en.json` | ⚠️ Optional – metadata is inline; add `seo` keys later if needed |
