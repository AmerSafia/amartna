# Amartna: Vue 2 + Vuetify to Quasar (Vue 3) Migration Design

## Date: 2026-03-01

## Overview

Migrate the Amartna building management app from Vue 2 + Vuetify 2 to Vue 3 + Quasar Framework with a complete UI/UX overhaul using a modern Bento Grid dark theme.

## Current State

- **Framework**: Vue 2.6 + Vuetify 2.6 + Vue Router 3
- **CMS**: Sanity v2 with GROQ queries
- **Pages**: Home, Populations, Payments, Expenses + 3 Admin CRUD pages + Login
- **State**: Simple reactive store (no Vuex)
- **Language**: Arabic (RTL)
- **Known bugs**: Client-side sorting broken in Expenses/Payments, date field inconsistency

## Target State

- **Framework**: Vue 3 + Quasar Framework (latest) + Vue Router 4
- **CMS**: Sanity client (same backend, updated client)
- **State**: Pinia
- **Build**: Quasar CLI (Vite-based)
- **Design**: Bento Grid Dashboard, dark theme

## Migration Approach

**Fresh Quasar Project** — Create new Quasar project, migrate business logic. The app is small (7 pages, 3 components, 4 schemas) so a clean start is faster than in-place upgrade.

## Architecture

```
amartna-quasar/
├── src/
│   ├── boot/
│   │   └── sanity.js              # Sanity client as boot file
│   ├── components/
│   │   ├── DataCard.vue           # Reusable bento card
│   │   ├── StatsCard.vue          # Dashboard gradient stat card
│   │   └── CrudTable.vue          # Admin CRUD table (QTable)
│   ├── layouts/
│   │   └── MainLayout.vue         # Dark sidebar + header + content
│   ├── pages/
│   │   ├── IndexPage.vue          # Bento grid dashboard
│   │   ├── ExpensesPage.vue       # Expenses sorted by _createdAt
│   │   ├── PaymentsPage.vue       # Payments sorted by _createdAt
│   │   ├── PopulationsPage.vue    # Building residents
│   │   ├── ManageExpensesPage.vue # Admin CRUD
│   │   ├── ManagePaymentsPage.vue # Admin CRUD
│   │   ├── ManagePopulationPage.vue # Admin CRUD
│   │   └── LoginPage.vue          # Login
│   ├── router/
│   │   └── routes.js              # Routes (same structure)
│   ├── stores/
│   │   └── auth.js                # Pinia auth store
│   └── css/
│       ├── app.scss               # Global styles
│       └── quasar.variables.scss  # Quasar theme overrides
├── amartna/                       # Sanity studio (unchanged)
└── quasar.config.js
```

## Design System

### Color Palette

| Token           | Color                    | Usage                          |
|-----------------|--------------------------|--------------------------------|
| Background      | `#0F1729`                | Main page background           |
| Surface         | `#1A2332`                | Card backgrounds, sidebar      |
| Surface Light   | `#243044`                | Hover states, secondary cards  |
| Primary         | `#6366F1` (Indigo)       | Primary buttons, active states |
| Success         | `#22C55E` (Green)        | Positive amounts, payments     |
| Warning         | `#F59E0B` (Amber)        | Expenses, alerts               |
| Danger          | `#EF4444` (Red)          | Negative balance, delete       |
| Text Primary    | `#F8FAFC`                | White text on dark             |
| Text Secondary  | `#94A3B8`                | Muted text, labels             |
| Gradient 1      | `#6366F1 -> #8B5CF6`    | Balance card gradient          |
| Gradient 2      | `#22C55E -> #10B981`    | Payments card gradient         |
| Gradient 3      | `#F59E0B -> #EF4444`    | Expenses card gradient         |

### Typography

- **Arabic text**: Cairo (Google Fonts)
- **Numbers/Latin**: Inter
- **Border radius**: 16px cards, 24px large cards, 12px buttons/inputs

### Design Style: Bento Grid Dashboard

- Deep navy background with gradient cards
- Varied card sizes in bento-box layout
- Soft shadows, rounded corners (16-24px)
- Bold typography with gradient accents
- White text on dark surfaces

## Pages Design

### Dashboard (Home)

Bento grid layout:
- Large balance card (2 cols): gradient background, big number, trend indicator
- Payments total card: green gradient, amount
- Expenses total card: amber-to-red gradient, amount
- Recent activity list: last 10 transactions combined

### Expenses Page

- Top filter bar: date range picker (QDate) + search input
- GROQ query: `*[_type=="expense"] | order(_createdAt desc)`
- Responsive card grid: 3 cols desktop, 2 tablet, 1 mobile
- Each card: name, amount (gradient chip), _createdAt date, description
- Pagination or infinite scroll

### Payments Page

- Same layout as Expenses
- GROQ query: `*[_type=="payment"] | order(_createdAt desc)`
- Additional filter: by resident name (dropdown)
- Additional filter: by month (QDate month picker)

### Populations Page

- Card grid with resident photos
- Sort by apartment number (ascending)
- Search by name

### Admin Pages (Manage*)

- QTable with dark theme styling
- Search bar
- Edit/Delete actions per row
- Add new button with form dialog
- Form validation (required fields)
- QNotify for success/error feedback
- Delete confirmation dialog

### Login Page

- Centered card on gradient background
- Email + password fields
- Error message display

## Data Flow

```
GROQ: *[_type=="expense"] | order(_createdAt desc)
  -> Sanity API (CDN)
  -> boot/sanity.js client
  -> Page component (onMounted, async)
  -> ref<Item[]>
  -> QCard list with v-for
  -> Client-side filters applied reactively
```

## Bug Fixes

1. **Sorting**: Server-side via GROQ `order(_createdAt desc)` — eliminates broken client-side sort
2. **Date consistency**: Use `_createdAt` everywhere (per user preference)
3. **Form validation**: Quasar validation rules on all admin forms
4. **Error handling**: QNotify for user-facing errors

## RTL Support

- Quasar has built-in RTL support via `quasar.config.js`
- Cairo font has excellent Arabic support
- All layouts will be RTL-first

## Sanity Studio

- Unchanged — stays in `amartna/` subdirectory
- Same schemas, same dataset, same project ID
- Only the frontend client is updated
