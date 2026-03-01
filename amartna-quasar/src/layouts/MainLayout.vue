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
