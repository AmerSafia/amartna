# Amartna: Quasar Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the Amartna building management app from Vue 2 + Vuetify to Vue 3 + Quasar with a modern Bento Grid dark UI, and fix expense/payment sorting to use `_createdAt` from Sanity.

**Architecture:** Fresh Quasar project with Vue 3 Composition API (`<script setup>`), Pinia for state, Sanity client as a boot file. Dark theme with Bento Grid dashboard layout. All GROQ queries use `order(_createdAt desc)` for server-side sorting.

**Tech Stack:** Vue 3, Quasar Framework (Vite), Pinia, @sanity/client, @sanity/image-url, SCSS, Cairo font (Arabic)

**Design doc:** `docs/plans/2026-03-01-quasar-migration-design.md`

---

### Task 1: Scaffold Quasar Project

**Files:**
- Create: `amartna-quasar/` (new project root)

**Step 1: Create Quasar project**

Run from `C:/Users/User/Desktop/projects/my projects/amartna/`:

```bash
npm init quasar@latest amartna-quasar -- --yes
```

When prompted, select:
- Project type: **App with Quasar CLI, let's go! (Vite)**
- Package name: `amartna`
- Project description: `Building Management App`
- CSS preprocessor: **Sass with SCSS syntax**
- Features: **ESLint**, **Pinia**
- Composition API or Options: **Composition API**

**Step 2: Install Sanity dependencies**

```bash
cd amartna-quasar
npm install @sanity/client @sanity/image-url
```

**Step 3: Add Cairo and Inter fonts**

In `quasar.config.js`, the `extras` array will be configured in Task 2.

**Step 4: Verify project runs**

```bash
npx quasar dev
```

Expected: Quasar default app loads at `http://localhost:9000`

**Step 5: Commit**

```bash
git add .
git commit -m "feat: scaffold Quasar project with Pinia and Sanity deps"
```

---

### Task 2: Configure Quasar Theme, RTL, and Dark Mode

**Files:**
- Modify: `amartna-quasar/quasar.config.js`
- Modify: `amartna-quasar/src/css/quasar.variables.scss`
- Create: `amartna-quasar/src/css/app.scss`

**Step 1: Configure `quasar.config.js`**

```javascript
// quasar.config.js
import { defineConfig } from '#q-app/wrappers'

export default defineConfig((ctx) => {
  return {
    boot: ['sanity'],

    css: ['app.scss'],

    extras: [
      'material-icons',
      'fontawesome-v6',
      'mdi-v7'
    ],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      },
      vueRouterMode: 'history',
    },

    devServer: {
      open: true
    },

    framework: {
      config: {
        brand: {
          primary: '#6366F1',
          secondary: '#22C55E',
          accent: '#F59E0B',
          dark: '#0F1729',
          'dark-page': '#0F1729',
          positive: '#22C55E',
          negative: '#EF4444',
          info: '#3B82F6',
          warning: '#F59E0B'
        },
        notify: {
          position: 'top',
          timeout: 2500
        }
      },
      lang: 'ar',
      plugins: ['Notify', 'Dialog', 'Loading', 'Dark']
    },

    animations: [],
    ssr: { pwa: false },
    pwa: {},
    cordova: {},
    capacitor: {},
    electron: {},
    bex: {}
  }
})
```

**Step 2: Write `src/css/quasar.variables.scss`**

```scss
$primary   : #6366F1;
$secondary : #22C55E;
$accent    : #F59E0B;
$dark      : #0F1729;
$dark-page : #0F1729;
$positive  : #22C55E;
$negative  : #EF4444;
$info      : #3B82F6;
$warning   : #F59E0B;
```

**Step 3: Write `src/css/app.scss`**

```scss
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Cairo', 'Inter', sans-serif;
  background-color: #0F1729;
  color: #F8FAFC;
  direction: rtl;
}

// Bento grid system
.bento-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.bento-card {
  background: #1A2332;
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  &--large {
    grid-column: span 2;

    @media (max-width: 600px) {
      grid-column: span 1;
    }
  }

  &--full {
    grid-column: 1 / -1;
  }
}

// Gradient cards for stats
.gradient-card {
  border-radius: 20px;
  padding: 28px;
  color: white;

  &--balance {
    background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  }
  &--payments {
    background: linear-gradient(135deg, #22C55E 0%, #10B981 100%);
  }
  &--expenses {
    background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
  }
}

// Stats number styling
.stat-number {
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.85;
  margin-top: 8px;
}

// Data card for list items
.data-card {
  background: #1A2332;
  border-radius: 16px;
  padding: 20px;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
    background: #243044;
  }
}

// Amount chip
.amount-chip {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9rem;

  &--positive {
    background: rgba(34, 197, 94, 0.15);
    color: #22C55E;
  }
  &--negative {
    background: rgba(245, 158, 11, 0.15);
    color: #F59E0B;
  }
}

// Text helpers
.text-secondary {
  color: #94A3B8 !important;
}

.text-surface {
  color: #1A2332;
}

// Page title
.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 24px;
}

// Filter bar
.filter-bar {
  background: #1A2332;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 20px;
}

// Override Quasar dark mode for inputs
.q-field__label {
  color: #94A3B8 !important;
}

.q-table {
  background: #1A2332 !important;
  color: #F8FAFC !important;
  border-radius: 16px !important;
}

.q-table thead th {
  color: #94A3B8 !important;
  border-bottom-color: #243044 !important;
}

.q-table tbody td {
  border-bottom-color: #243044 !important;
}
```

**Step 4: Verify dark theme loads**

```bash
npx quasar dev
```

Expected: App loads with dark navy background, Cairo font visible.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: configure dark theme, RTL, Bento Grid styles, Cairo font"
```

---

### Task 3: Create Sanity Boot File and Composable

**Files:**
- Create: `amartna-quasar/src/boot/sanity.js`
- Create: `amartna-quasar/src/composables/useSanity.js`

**Step 1: Create `src/boot/sanity.js`**

```javascript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: 'txe0s5w5',
  dataset: 'production',
  apiVersion: '2022-10-24',
  useCdn: true,
  token: 'skPKHRzHAAxZV74SQZCihvyAL7JZdAmEn2ghB2UFhLJHg7rpgB9iQ54VEiHJyMqskJRmlt2v4eEdmhqeqe7ktzWydBo8aW1NoBJumi7dLCx7jPOdnyhCxPhNfXQT0uhLrx695Qh9Bv3B4INXAbFzo4ZcxTzq1fSzkG9IrRQSiygQfTJX9FkK'
})

const builder = imageUrlBuilder(client)
const urlFor = (source) => builder.image(source)

export { client, urlFor }
```

**Step 2: Create `src/composables/useSanity.js`**

```javascript
import { ref } from 'vue'
import { client } from '../boot/sanity'

export function useSanity() {
  const loading = ref(false)
  const error = ref(null)

  async function fetch(query, params = {}) {
    loading.value = true
    error.value = null
    try {
      const data = await client.fetch(query, params)
      return data
    } catch (err) {
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  async function create(type, doc) {
    try {
      return await client.create({ _type: type, ...doc })
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function createOrReplace(doc) {
    try {
      return await client.createOrReplace(doc)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function remove(id) {
    try {
      return await client.delete(id)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return { loading, error, fetch, create, createOrReplace, remove }
}
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add Sanity boot file and useSanity composable"
```

---

### Task 4: Create Pinia Auth Store

**Files:**
- Create: `amartna-quasar/src/stores/auth.js`

**Step 1: Create `src/stores/auth.js`**

```javascript
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedIn: false
  }),
  actions: {
    login() {
      this.loggedIn = true
    },
    logout() {
      this.loggedIn = false
    }
  }
})
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Pinia auth store"
```

---

### Task 5: Create MainLayout with Dark Sidebar

**Files:**
- Modify: `amartna-quasar/src/layouts/MainLayout.vue`

**Step 1: Write `src/layouts/MainLayout.vue`**

This replaces the default generated layout. The layout has:
- Dark sidebar (QDrawer) with navigation
- Header toolbar
- Admin items hidden until logged in

```vue
<template>
  <q-layout view="hHh lpR fFf" class="bg-dark">
    <q-header class="bg-transparent">
      <q-toolbar class="q-px-md" style="background: #1A2332;">
        <q-btn flat dense round icon="menu" color="white" @click="toggleDrawer" />
        <q-toolbar-title class="text-white text-weight-bold">
          عمارتنا
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="260"
      style="background: #1A2332;"
      bordered
    >
      <q-list padding>
        <q-item-label header class="text-white text-weight-bold q-pb-md" style="font-size: 1.25rem;">
          عمارتنا
        </q-item-label>

        <q-separator dark class="q-mb-sm" />

        <template v-for="item in visibleNav" :key="item.id">
          <q-item
            clickable
            v-ripple
            :to="item.url"
            active-class="nav-active"
            class="rounded-borders q-mx-sm q-my-xs"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" color="grey-5" />
            </q-item-section>
            <q-item-section class="text-grey-3">
              {{ item.name }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const drawer = ref(false)

function toggleDrawer() {
  drawer.value = !drawer.value
}

const navItems = [
  { name: 'الصفحة الرئيسية', url: '/', icon: 'mdi-home', id: 1 },
  { name: 'سكان العمارة', url: '/populations', icon: 'far fa-building', id: 2 },
  { name: 'الدفعات', url: '/payments', icon: 'fas fa-file-alt', id: 3 },
  { name: 'المصاريف', url: '/expenses', icon: 'mdi-cash-register', id: 4 },
  { name: 'ادارة السكان', url: '/manage-population', icon: 'fas fa-users', adminOnly: true, id: 5 },
  { name: 'ادارة الدفعات', url: '/manage-payments', icon: 'fas fa-file-invoice-dollar', adminOnly: true, id: 6 },
  { name: 'ادارة المصاريف', url: '/manage-expenses', icon: 'fas fa-hand-holding-usd', adminOnly: true, id: 7 },
  { name: 'تسجيل الدخول', url: '/login', icon: 'fas fa-sign-in-alt', id: 8 }
]

const visibleNav = computed(() => {
  return navItems.filter(item => !item.adminOnly || auth.loggedIn)
})
</script>

<style lang="scss" scoped>
.nav-active {
  background: rgba(99, 102, 241, 0.15);

  .q-icon {
    color: #6366F1 !important;
  }

  .q-item__section {
    color: #6366F1 !important;
    font-weight: 600;
  }
}
</style>
```

**Step 2: Verify layout renders**

```bash
npx quasar dev
```

Expected: Dark sidebar with Arabic nav items, responsive drawer.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add MainLayout with dark sidebar navigation"
```

---

### Task 6: Set Up Router

**Files:**
- Modify: `amartna-quasar/src/router/routes.js`

**Step 1: Write `src/router/routes.js`**

```javascript
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: 'populations', name: 'Populations', component: () => import('pages/PopulationsPage.vue') },
      { path: 'payments', name: 'Payments', component: () => import('pages/PaymentsPage.vue') },
      { path: 'expenses', name: 'Expenses', component: () => import('pages/ExpensesPage.vue') },
      { path: 'manage-population', name: 'ManagePopulation', component: () => import('pages/ManagePopulationPage.vue') },
      { path: 'manage-payments', name: 'ManagePayments', component: () => import('pages/ManagePaymentsPage.vue') },
      { path: 'manage-expenses', name: 'ManageExpenses', component: () => import('pages/ManageExpensesPage.vue') },
      { path: 'login', name: 'Login', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/IndexPage.vue')
  }
]

export default routes
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: configure routes for all pages"
```

---

### Task 7: Create StatsCard Component

**Files:**
- Create: `amartna-quasar/src/components/StatsCard.vue`

**Step 1: Write `src/components/StatsCard.vue`**

```vue
<template>
  <div class="gradient-card" :class="`gradient-card--${variant}`">
    <div class="text-secondary-light q-mb-sm" style="opacity: 0.85;">
      <q-icon :name="icon" size="24px" class="q-mr-xs" />
      {{ label }}
    </div>
    <div class="stat-number">
      {{ formatNumber(value) }}
      <span style="font-size: 1rem; font-weight: 400;">د.أ</span>
    </div>
    <div v-if="subtitle" class="q-mt-sm" style="opacity: 0.7; font-size: 0.8rem;">
      {{ subtitle }}
    </div>
    <div v-if="linkTo" class="q-mt-md">
      <router-link :to="linkTo" class="text-white" style="opacity: 0.85; text-decoration: none; font-size: 0.85rem;">
        للمزيد من التفاصيل &larr;
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: { type: Number, default: 0 },
  icon: String,
  variant: { type: String, default: 'balance' },
  subtitle: String,
  linkTo: String
})

function formatNumber(num) {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add StatsCard component with gradient variants"
```

---

### Task 8: Create Dashboard Page (IndexPage)

**Files:**
- Modify: `amartna-quasar/src/pages/IndexPage.vue`

**Step 1: Write `src/pages/IndexPage.vue`**

Migrated from `src/views/index.vue`. Uses Bento Grid layout with 3 gradient stat cards.

```vue
<template>
  <q-page class="q-pa-md">
    <div class="page-title">لوحة التحكم</div>

    <div class="bento-grid">
      <!-- Balance Card - spans 2 columns -->
      <div class="bento-card--large">
        <StatsCard
          label="المبلغ المتبقي"
          :value="totalPayments - totalExpenses"
          icon="fa-solid fa-filter-circle-dollar"
          variant="balance"
          :subtitle="`حتى تاريخ ${date}`"
        />
      </div>

      <!-- Payments Card -->
      <div>
        <StatsCard
          label="مجموع المدفوعات"
          :value="totalPayments"
          icon="fa-solid fa-coins"
          variant="payments"
          link-to="/payments"
          :subtitle="`حتى تاريخ ${date}`"
        />
      </div>

      <!-- Expenses Card -->
      <div>
        <StatsCard
          label="مجموع المصاريف"
          :value="totalExpenses"
          icon="fas fa-chart-bar"
          variant="expenses"
          link-to="/expenses"
          :subtitle="`حتى تاريخ ${date}`"
        />
      </div>

      <!-- Payments Card (smaller) -->
      <div>
        <StatsCard
          label="عدد الدفعات"
          :value="paymentsCount"
          icon="mdi-counter"
          variant="payments"
        />
      </div>

      <!-- Recent Activity -->
      <div class="bento-card bento-card--full">
        <div class="text-grey-5 q-mb-md text-weight-medium">آخر النشاطات</div>
        <q-list dark separator>
          <q-item v-for="item in recentActivity" :key="item._id" class="q-px-none">
            <q-item-section avatar>
              <q-icon
                :name="item._type === 'payment' ? 'fa-solid fa-coins' : 'mdi-cash-register'"
                :color="item._type === 'payment' ? 'positive' : 'warning'"
                size="20px"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-grey-3">{{ item.name }}</q-item-label>
              <q-item-label caption class="text-grey-6">
                {{ item._type === 'payment' ? 'دفعة' : 'مصروف' }}
                -
                {{ formatDate(item._createdAt) }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <span :class="item._type === 'payment' ? 'amount-chip amount-chip--positive' : 'amount-chip amount-chip--negative'">
                {{ item.amount }} د.أ
              </span>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSanity } from '../composables/useSanity'
import StatsCard from '../components/StatsCard.vue'

const { fetch } = useSanity()

const totalPayments = ref(0)
const totalExpenses = ref(0)
const paymentsCount = ref(0)
const recentActivity = ref([])
const date = new Date().toLocaleDateString('ar')

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar')
}

onMounted(async () => {
  const [payments, expenses] = await Promise.all([
    fetch('*[_type=="payment"]'),
    fetch('*[_type=="expense"]')
  ])

  totalPayments.value = payments.reduce((sum, p) => sum + p.amount, 0)
  totalExpenses.value = expenses.reduce((sum, e) => sum + e.amount, 0)
  paymentsCount.value = payments.length

  // Combine and sort by _createdAt for recent activity
  const combined = [...payments, ...expenses]
    .sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt))
    .slice(0, 10)
  recentActivity.value = combined
})
</script>
```

**Step 2: Verify dashboard renders**

```bash
npx quasar dev
```

Expected: Bento grid with 3 gradient stat cards and recent activity list.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add Bento Grid dashboard with stats and recent activity"
```

---

### Task 9: Create Expenses Page (Sorted by _createdAt)

**Files:**
- Create: `amartna-quasar/src/pages/ExpensesPage.vue`

**Step 1: Write `src/pages/ExpensesPage.vue`**

Key fix: Uses `order(_createdAt desc)` in GROQ for server-side sorting.

```vue
<template>
  <q-page class="q-pa-md">
    <div class="page-title">مصاريف</div>

    <!-- Filter Bar -->
    <div class="filter-bar row q-gutter-sm items-center">
      <q-input
        v-model="search"
        dark
        dense
        outlined
        placeholder="بحث بالاسم..."
        class="col-grow"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="search" color="grey-5" />
        </template>
      </q-input>
      <q-input
        v-model="dateFrom"
        dark
        dense
        outlined
        type="date"
        label="من تاريخ"
        class="col-auto"
        style="min-width: 160px;"
      />
      <q-input
        v-model="dateTo"
        dark
        dense
        outlined
        type="date"
        label="إلى تاريخ"
        class="col-auto"
        style="min-width: 160px;"
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <!-- Cards Grid -->
    <div v-else class="bento-grid">
      <div v-for="item in filteredExpenses" :key="item._id" class="data-card">
        <div class="row justify-between items-start q-mb-sm">
          <div>
            <div class="text-weight-bold text-grey-2" style="font-size: 1.1rem;">
              {{ item.name }}
            </div>
            <div class="text-grey-6" style="font-size: 0.8rem;">
              {{ formatDate(item._createdAt) }}
            </div>
          </div>
          <span class="amount-chip amount-chip--negative">
            {{ item.amount }} د.أ
          </span>
        </div>
        <div v-if="item.description" class="text-grey-5" style="font-size: 0.9rem;">
          {{ item.description }}
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && filteredExpenses.length === 0" class="text-center q-pa-xl text-grey-6">
      لا توجد مصاريف
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSanity } from '../composables/useSanity'

const { fetch, loading } = useSanity()

const expenses = ref([])
const search = ref('')
const dateFrom = ref('')
const dateTo = ref('')

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar')
}

const filteredExpenses = computed(() => {
  let result = expenses.value

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(e => e.name?.toLowerCase().includes(q))
  }

  if (dateFrom.value) {
    const from = new Date(dateFrom.value)
    result = result.filter(e => new Date(e._createdAt) >= from)
  }

  if (dateTo.value) {
    const to = new Date(dateTo.value)
    to.setHours(23, 59, 59)
    result = result.filter(e => new Date(e._createdAt) <= to)
  }

  return result
})

onMounted(async () => {
  // Server-side sorting by _createdAt descending
  expenses.value = await fetch('*[_type=="expense"] | order(_createdAt desc)')
})
</script>
```

**Step 2: Verify page renders with sorted data**

```bash
npx quasar dev
```

Navigate to `/expenses`. Expected: Expenses displayed newest first by `_createdAt`.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add ExpensesPage with _createdAt sorting and filters"
```

---

### Task 10: Create Payments Page (Sorted by _createdAt with Filters)

**Files:**
- Create: `amartna-quasar/src/pages/PaymentsPage.vue`

**Step 1: Write `src/pages/PaymentsPage.vue`**

Migrated from `src/views/Payments.vue`. Fixes sorting and adds filter by name and month using `_createdAt`.

```vue
<template>
  <q-page class="q-pa-md">
    <div class="page-title">الدفعات</div>

    <!-- Filter Bar -->
    <div class="filter-bar row q-gutter-sm items-center">
      <q-select
        v-model="filterBy"
        :options="filterOptions"
        option-label="name"
        option-value="value"
        emit-value
        map-options
        dark
        dense
        outlined
        label="تصفية بواسطة"
        class="col-auto"
        style="min-width: 150px;"
      />

      <q-select
        v-if="filterBy === 'name'"
        v-model="filteredByName"
        :options="nameOptions"
        dark
        dense
        outlined
        label="اختر الاسم"
        class="col-auto"
        style="min-width: 180px;"
        clearable
        @update:model-value="filterByName"
      />

      <q-input
        v-if="filterBy === 'month'"
        v-model="selectedMonth"
        dark
        dense
        outlined
        type="month"
        label="اختر الشهر"
        class="col-auto"
        style="min-width: 180px;"
      />

      <q-btn
        v-if="filterBy"
        color="primary"
        label="بحث"
        no-caps
        unelevated
        class="q-px-lg"
        style="border-radius: 12px;"
        @click="applyFilter"
      />

      <q-btn
        flat
        color="grey-5"
        label="إعادة تعيين"
        no-caps
        @click="resetFilter"
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <!-- Cards Grid -->
    <div v-else class="bento-grid">
      <div v-for="item in payments" :key="item._id" class="data-card">
        <div class="row justify-between items-start q-mb-sm">
          <div>
            <div class="text-weight-bold text-grey-2" style="font-size: 1.1rem;">
              {{ item.name }}
            </div>
            <div class="text-grey-6" style="font-size: 0.8rem;">
              {{ formatDate(item._createdAt) }}
            </div>
          </div>
          <span class="amount-chip amount-chip--positive">
            {{ item.amount }} د.أ
          </span>
        </div>
        <div v-if="item.description" class="text-grey-5" style="font-size: 0.9rem;">
          {{ item.description }}
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && payments.length === 0" class="text-center q-pa-xl text-grey-6">
      لا توجد دفعات
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSanity } from '../composables/useSanity'

const { fetch, loading } = useSanity()

const payments = ref([])
const allPayments = ref([])
const nameOptions = ref([])
const filterBy = ref('month')
const filteredByName = ref('')
const selectedMonth = ref(new Date().toISOString().substr(0, 7))

const filterOptions = [
  { name: 'الشهر', value: 'month' },
  { name: 'الاسم', value: 'name' }
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar')
}

async function loadPayments() {
  // Server-side sorting by _createdAt descending
  const data = await fetch('*[_type=="payment"] | order(_createdAt desc)')
  allPayments.value = data
  payments.value = data
  nameOptions.value = [...new Set(data.map(p => p.name))].filter(Boolean)
}

async function filterByName() {
  if (!filteredByName.value) {
    payments.value = allPayments.value
    return
  }
  payments.value = await fetch(
    '*[_type=="payment" && name == $name] | order(_createdAt desc)',
    { name: filteredByName.value }
  )
}

async function filterByMonth() {
  if (!selectedMonth.value) return
  const firstDay = new Date(selectedMonth.value + '-01').toISOString()
  const year = new Date(selectedMonth.value).getFullYear()
  const month = new Date(selectedMonth.value).getMonth() + 1
  const lastDay = new Date(year, month, 1).toISOString()

  payments.value = await fetch(
    `*[_type=="payment" && dateTime(_createdAt) >= dateTime($from) && dateTime(_createdAt) <= dateTime($to)] | order(_createdAt desc)`,
    { from: firstDay, to: lastDay }
  )
}

function applyFilter() {
  if (filterBy.value === 'name') filterByName()
  else filterByMonth()
}

function resetFilter() {
  filteredByName.value = ''
  selectedMonth.value = new Date().toISOString().substr(0, 7)
  payments.value = allPayments.value
}

onMounted(loadPayments)
</script>
```

**Step 2: Verify page renders with filters**

Navigate to `/payments`. Expected: Payments sorted by `_createdAt` desc, filter by name and month works.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add PaymentsPage with _createdAt sorting and name/month filters"
```

---

### Task 11: Create Populations Page

**Files:**
- Create: `amartna-quasar/src/pages/PopulationsPage.vue`

**Step 1: Write `src/pages/PopulationsPage.vue`**

Migrated from `src/views/Populations.vue`.

```vue
<template>
  <q-page class="q-pa-md">
    <div class="page-title">سكان العمارة</div>

    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <div v-else class="bento-grid">
      <div v-for="item in population" :key="item._id" class="data-card">
        <div class="row justify-between items-start q-mb-sm">
          <div>
            <div class="text-weight-bold text-grey-2" style="font-size: 1.1rem;">
              {{ item.name }}
            </div>
            <div class="text-grey-6" style="font-size: 0.8rem;">
              0{{ item.phone }}
            </div>
          </div>
          <q-badge
            color="warning"
            text-color="dark"
            class="text-weight-bold q-pa-sm"
            style="border-radius: 10px;"
          >
            شقة {{ item.numApartment }}
          </q-badge>
        </div>
        <div v-if="item.description" class="text-grey-5" style="font-size: 0.9rem;">
          {{ item.description }}
        </div>
      </div>
    </div>

    <div v-if="!loading && population.length === 0" class="text-center q-pa-xl text-grey-6">
      لا يوجد سكان
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSanity } from '../composables/useSanity'

const { fetch, loading } = useSanity()
const population = ref([])

onMounted(async () => {
  const data = await fetch('*[_type=="population"] | order(numApartment asc)')
  population.value = data
})
</script>
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add PopulationsPage with apartment number sorting"
```

---

### Task 12: Create CrudTable Component

**Files:**
- Create: `amartna-quasar/src/components/CrudTable.vue`

**Step 1: Write `src/components/CrudTable.vue`**

Migrated from `src/components/CrudTable.vue`, now using QTable.

```vue
<template>
  <q-table
    :rows="data"
    :columns="columns"
    row-key="_id"
    dark
    flat
    :filter="filter"
    class="q-mt-md"
    style="background: #1A2332; border-radius: 16px;"
  >
    <template v-slot:top>
      <q-input v-model="filter" dark dense outlined placeholder="بحث..." class="col-4">
        <template v-slot:prepend>
          <q-icon name="search" color="grey-5" />
        </template>
      </q-input>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn flat round dense icon="edit" color="primary" @click="$emit('handleEdit', props.row)" />
        <q-btn flat round dense icon="delete" color="negative" @click="confirmDelete(props.row)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useSanity } from '../composables/useSanity'

const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true }
})

const emit = defineEmits(['handleEdit', 'deleted'])

const $q = useQuasar()
const { remove } = useSanity()
const filter = ref('')

function confirmDelete(row) {
  $q.dialog({
    title: 'تأكيد الحذف',
    message: 'هل أنت متأكد من حذف هذا العنصر؟',
    cancel: { label: 'إلغاء', flat: true },
    ok: { label: 'حذف', color: 'negative' },
    dark: true
  }).onOk(async () => {
    try {
      await remove(row._id)
      emit('deleted', row._id)
      $q.notify({ type: 'positive', message: 'تم الحذف بنجاح' })
    } catch {
      $q.notify({ type: 'negative', message: 'حدث خطأ أثناء الحذف' })
    }
  })
}
</script>
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add CrudTable component with QTable, search, delete"
```

---

### Task 13: Create ManageExpenses Admin Page

**Files:**
- Create: `amartna-quasar/src/pages/ManageExpensesPage.vue`

**Step 1: Write `src/pages/ManageExpensesPage.vue`**

Migrated from `src/views/manageExpenses.vue`.

```vue
<template>
  <q-page class="q-pa-md">
    <div class="page-title">ادارة الصرف</div>

    <q-btn color="primary" label="اضافة صرف" no-caps unelevated style="border-radius: 12px;" @click="openDialog()" />

    <CrudTable
      :data="expenses"
      :columns="columns"
      @handle-edit="openDialog"
      @deleted="onDeleted"
    />

    <!-- Add/Edit Dialog -->
    <q-dialog v-model="dialog" persistent>
      <q-card dark style="min-width: 500px; background: #1A2332; border-radius: 16px;">
        <q-card-section>
          <div class="text-h6">{{ expense._id ? 'تعديل صرف' : 'اضافة صرف' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="expense.name" dark outlined label="اسم الصرف" :rules="[val => !!val || 'مطلوب']" />
          <q-input v-model="expense.date" dark outlined type="date" label="تاريخ الصرف" />
          <q-input v-model.number="expense.amount" dark outlined type="number" label="المبلغ" :rules="[val => val > 0 || 'مطلوب']" />
          <q-input v-model="expense.description" dark outlined type="textarea" label="التفاصيل" />
        </q-card-section>

        <q-card-actions align="left" class="q-pa-md">
          <q-btn flat label="اغلاق" color="grey-5" no-caps @click="dialog = false" />
          <q-btn unelevated label="حفظ" color="primary" no-caps style="border-radius: 12px;" @click="saveExpense" :loading="saving" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useSanity } from '../composables/useSanity'
import CrudTable from '../components/CrudTable.vue'

const $q = useQuasar()
const { fetch, create, createOrReplace } = useSanity()

const expenses = ref([])
const expense = ref({})
const dialog = ref(false)
const saving = ref(false)

const columns = [
  { name: 'name', label: 'الاسم', field: 'name', align: 'right' },
  { name: 'date', label: 'التاريخ', field: 'date', align: 'right' },
  { name: 'amount', label: 'المبلغ', field: 'amount', align: 'right' },
  { name: 'description', label: 'التفاصيل', field: 'description', align: 'right' },
  { name: 'actions', label: '', field: 'actions', align: 'center' }
]

function openDialog(item = null) {
  expense.value = item ? { ...item } : {
    date: new Date().toISOString().substr(0, 10)
  }
  dialog.value = true
}

async function saveExpense() {
  if (!expense.value.name || !expense.value.amount) return
  saving.value = true
  try {
    if (expense.value._id) {
      const row = { _type: 'expense', ...expense.value }
      await createOrReplace(row)
      const idx = expenses.value.findIndex(e => e._id === expense.value._id)
      if (idx !== -1) expenses.value[idx] = { ...expense.value }
    } else {
      const created = await create('expense', expense.value)
      expenses.value.unshift({ ...expense.value, _id: created._id })
    }
    dialog.value = false
    $q.notify({ type: 'positive', message: 'تم الحفظ بنجاح' })
  } catch {
    $q.notify({ type: 'negative', message: 'حدث خطأ أثناء الحفظ' })
  } finally {
    saving.value = false
  }
}

function onDeleted(id) {
  expenses.value = expenses.value.filter(e => e._id !== id)
}

onMounted(async () => {
  expenses.value = await fetch('*[_type=="expense"] | order(_createdAt desc)')
})
</script>
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add ManageExpensesPage with CRUD and validation"
```

---

### Task 14: Create ManagePayments Admin Page

**Files:**
- Create: `amartna-quasar/src/pages/ManagePaymentsPage.vue`

**Step 1: Write `src/pages/ManagePaymentsPage.vue`**

Migrated from `src/views/managePayments.vue`. Includes population dropdown for selecting resident.

```vue
<template>
  <q-page class="q-pa-md">
    <div class="page-title">ادارة الدفعات</div>

    <q-btn color="primary" label="اضافة دفعة" no-caps unelevated style="border-radius: 12px;" @click="openDialog()" />

    <CrudTable
      :data="payments"
      :columns="columns"
      @handle-edit="openDialog"
      @deleted="onDeleted"
    />

    <!-- Add/Edit Dialog -->
    <q-dialog v-model="dialog" persistent>
      <q-card dark style="min-width: 500px; background: #1A2332; border-radius: 16px;">
        <q-card-section>
          <div class="text-h6">{{ payment._id ? 'تعديل دفعة' : 'اضافة دفعة' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-select
            v-model="payment.name"
            :options="populationNames"
            dark
            outlined
            label="اختر الاسم"
            @update:model-value="onNameSelected"
          />
          <q-input v-model.number="payment.numApartment" dark outlined type="number" label="رقم الشقة" readonly />
          <q-input v-model="payment.date" dark outlined type="date" label="تاريخ الدفعة" />
          <q-input v-model.number="payment.amount" dark outlined type="number" label="المبلغ" :rules="[val => val > 0 || 'مطلوب']" />
          <q-input v-model="payment.description" dark outlined type="textarea" label="التفاصيل" />
        </q-card-section>

        <q-card-actions align="left" class="q-pa-md">
          <q-btn flat label="اغلاق" color="grey-5" no-caps @click="dialog = false" />
          <q-btn unelevated label="حفظ" color="primary" no-caps style="border-radius: 12px;" @click="savePayment" :loading="saving" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useSanity } from '../composables/useSanity'
import CrudTable from '../components/CrudTable.vue'

const $q = useQuasar()
const { fetch, create, createOrReplace } = useSanity()

const payments = ref([])
const population = ref([])
const populationNames = ref([])
const payment = ref({})
const dialog = ref(false)
const saving = ref(false)

const columns = [
  { name: 'name', label: 'الاسم', field: 'name', align: 'right' },
  { name: 'date', label: 'التاريخ', field: 'date', align: 'right' },
  { name: 'numApartment', label: 'رقم الشقة', field: 'numApartment', align: 'right' },
  { name: 'amount', label: 'المبلغ', field: 'amount', align: 'right' },
  { name: 'description', label: 'التفاصيل', field: 'description', align: 'right' },
  { name: 'actions', label: '', field: 'actions', align: 'center' }
]

function openDialog(item = null) {
  payment.value = item ? { ...item } : {
    date: new Date().toISOString().substr(0, 10),
    numApartment: 0
  }
  dialog.value = true
}

function onNameSelected(name) {
  const resident = population.value.find(p => p.name === name)
  if (resident) payment.value.numApartment = resident.numApartment
}

async function savePayment() {
  if (!payment.value.name || !payment.value.amount) return
  saving.value = true
  try {
    if (payment.value._id) {
      const row = { _type: 'payment', ...payment.value }
      await createOrReplace(row)
      const idx = payments.value.findIndex(p => p._id === payment.value._id)
      if (idx !== -1) payments.value[idx] = { ...payment.value }
    } else {
      const created = await create('payment', payment.value)
      payments.value.unshift({ ...payment.value, _id: created._id })
    }
    dialog.value = false
    $q.notify({ type: 'positive', message: 'تم الحفظ بنجاح' })
  } catch {
    $q.notify({ type: 'negative', message: 'حدث خطأ أثناء الحفظ' })
  } finally {
    saving.value = false
  }
}

function onDeleted(id) {
  payments.value = payments.value.filter(p => p._id !== id)
}

onMounted(async () => {
  const [paymentsData, populationData] = await Promise.all([
    fetch('*[_type=="payment"] | order(_createdAt desc)'),
    fetch('*[_type=="population"]')
  ])
  payments.value = paymentsData
  population.value = populationData
  populationNames.value = populationData.map(p => p.name)
})
</script>
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add ManagePaymentsPage with resident selection and CRUD"
```

---

### Task 15: Create ManagePopulation Admin Page

**Files:**
- Create: `amartna-quasar/src/pages/ManagePopulationPage.vue`

**Step 1: Write `src/pages/ManagePopulationPage.vue`**

Migrated from `src/views/managePopulation.vue`.

```vue
<template>
  <q-page class="q-pa-md">
    <div class="page-title">ادارة السكان</div>

    <q-btn color="primary" label="اضافة ساكن" no-caps unelevated style="border-radius: 12px;" @click="openDialog()" />

    <CrudTable
      :data="population"
      :columns="columns"
      @handle-edit="openDialog"
      @deleted="onDeleted"
    />

    <q-dialog v-model="dialog" persistent>
      <q-card dark style="min-width: 500px; background: #1A2332; border-radius: 16px;">
        <q-card-section>
          <div class="text-h6">{{ entity._id ? 'تعديل ساكن' : 'اضافة ساكن' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="entity.name" dark outlined label="الاسم" :rules="[val => !!val || 'مطلوب']" />
          <q-input v-model.number="entity.numApartment" dark outlined type="number" label="رقم الشقة" :rules="[val => val > 0 || 'مطلوب']" />
          <q-input v-model.number="entity.phone" dark outlined type="number" label="رقم الهاتف" />
          <q-input v-model="entity.description" dark outlined type="textarea" label="التفاصيل" />
        </q-card-section>

        <q-card-actions align="left" class="q-pa-md">
          <q-btn flat label="اغلاق" color="grey-5" no-caps @click="dialog = false" />
          <q-btn unelevated label="حفظ" color="primary" no-caps style="border-radius: 12px;" @click="saveEntity" :loading="saving" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useSanity } from '../composables/useSanity'
import CrudTable from '../components/CrudTable.vue'

const $q = useQuasar()
const { fetch, create, createOrReplace } = useSanity()

const population = ref([])
const entity = ref({})
const dialog = ref(false)
const saving = ref(false)

const columns = [
  { name: 'name', label: 'الاسم', field: 'name', align: 'right' },
  { name: 'numApartment', label: 'رقم الشقة', field: 'numApartment', align: 'right', sortable: true },
  { name: 'phone', label: 'رقم الهاتف', field: 'phone', align: 'right' },
  { name: 'description', label: 'التفاصيل', field: 'description', align: 'right' },
  { name: 'actions', label: '', field: 'actions', align: 'center' }
]

function openDialog(item = null) {
  entity.value = item ? { ...item } : {}
  dialog.value = true
}

async function saveEntity() {
  if (!entity.value.name || !entity.value.numApartment) return
  saving.value = true
  try {
    if (entity.value._id) {
      const row = { _type: 'population', ...entity.value }
      await createOrReplace(row)
      const idx = population.value.findIndex(p => p._id === entity.value._id)
      if (idx !== -1) population.value[idx] = { ...entity.value }
    } else {
      const created = await create('population', entity.value)
      population.value.push({ ...entity.value, _id: created._id })
    }
    dialog.value = false
    $q.notify({ type: 'positive', message: 'تم الحفظ بنجاح' })
  } catch {
    $q.notify({ type: 'negative', message: 'حدث خطأ أثناء الحفظ' })
  } finally {
    saving.value = false
  }
}

function onDeleted(id) {
  population.value = population.value.filter(p => p._id !== id)
}

onMounted(async () => {
  population.value = await fetch('*[_type=="population"] | order(numApartment asc)')
})
</script>
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add ManagePopulationPage with CRUD"
```

---

### Task 16: Create Login Page

**Files:**
- Create: `amartna-quasar/src/pages/LoginPage.vue`

**Step 1: Write `src/pages/LoginPage.vue`**

Migrated from `src/views/Login.vue`.

```vue
<template>
  <q-page class="flex flex-center">
    <q-card dark style="min-width: 400px; background: #1A2332; border-radius: 20px;" class="q-pa-md">
      <q-card-section>
        <div class="text-h5 text-center text-weight-bold q-mb-lg">تسجيل الدخول</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input
          v-model="email"
          dark
          outlined
          label="البريد الإلكتروني"
          type="email"
        />
        <q-input
          v-model="password"
          dark
          outlined
          label="كلمة المرور"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              color="grey-5"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <div v-if="error" class="text-negative text-center">{{ error }}</div>
      </q-card-section>

      <q-card-actions class="q-pa-md">
        <q-btn
          unelevated
          color="primary"
          label="تسجيل الدخول"
          no-caps
          class="full-width"
          style="border-radius: 12px; padding: 12px;"
          :loading="logging"
          @click="login"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useSanity } from '../composables/useSanity'

const router = useRouter()
const auth = useAuthStore()
const { fetch } = useSanity()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const logging = ref(false)

async function login() {
  logging.value = true
  error.value = ''
  const users = await fetch(
    '*[_type=="admin" && email==$email && password==$password]',
    { email: email.value, password: password.value }
  )
  logging.value = false

  if (users.length) {
    auth.login()
    router.push({ name: 'Home' })
  } else {
    error.value = 'يرجى التحقق من البريد الإلكتروني وكلمة المرور'
  }
}
</script>
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add LoginPage with dark themed card"
```

---

### Task 17: Clean Up and Final Verification

**Files:**
- Remove: `amartna-quasar/src/pages/ErrorNotFound.vue` (if auto-generated and not needed)
- Verify: All pages load correctly

**Step 1: Run the full app**

```bash
cd amartna-quasar
npx quasar dev
```

**Step 2: Verify each route works**

Navigate to each route and verify:
- `/` — Dashboard with 3 gradient cards + recent activity
- `/expenses` — Expenses sorted by `_createdAt` desc, filters work
- `/payments` — Payments sorted by `_createdAt` desc, name/month filters work
- `/populations` — Residents sorted by apartment number
- `/login` — Login works, admin nav items appear after login
- `/manage-expenses` — CRUD table with add/edit/delete
- `/manage-payments` — CRUD table with resident dropdown
- `/manage-population` — CRUD table with add/edit/delete

**Step 3: Verify RTL**

All text should be right-to-left. Drawer should appear on the right side.

**Step 4: Verify responsive**

Resize browser to mobile width. Cards should stack to 1 column. Drawer should hide and show via hamburger menu.

**Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete Quasar migration with Bento Grid dark theme"
```

---

## Summary of Key Changes

| Area | Old (Vue 2 + Vuetify) | New (Vue 3 + Quasar) |
|------|----------------------|---------------------|
| Framework | Vue 2.6 Options API | Vue 3 Composition API `<script setup>` |
| UI Library | Vuetify 2.6 | Quasar Framework (latest) |
| State | Reactive store object | Pinia |
| Sorting | Buggy client-side `.sort()` | GROQ `order(_createdAt desc)` server-side |
| Theme | Purple + Beige, light | Deep Navy Bento Grid, dark |
| Font | Default | Cairo (Arabic) + Inter (numbers) |
| Error Handling | `console.log` | QNotify toasts |
| Validation | None | Quasar input rules |
| Sanity Client | Inline in lib/ | Boot file + composable |
