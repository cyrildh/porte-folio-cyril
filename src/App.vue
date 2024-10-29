

<template>
  <div
    id="app"
    class="min-h-screen bg-gray-50"
  >
    <header class="fixed inset-x-0 top-0 z-50 bg-white shadow">
      <nav
        class="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <router-link
            to="/"
            class="text-xl font-bold text-gray-900"
          >
            Cyril Dohin
          </router-link>
        </div>
        
        <!-- Menu burger mobile -->
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span class="sr-only">Ouvrir le menu</span>
            <Bars3Icon
              class="h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>

        <!-- Menu desktop -->
        <div class="hidden lg:flex lg:gap-x-12">
          <router-link
            v-for="item in menuItems"
            :key="item.href"
            :to="item.href"
            class="text-sm font-semibold leading-6 text-gray-700 hover:text-gray-900"
          >
            {{ item.name }}
          </router-link>
        </div>
      </nav>

      <!-- Menu mobile -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden"
      >
        <div class="space-y-2 px-2 pb-3 pt-2">
          <router-link
            v-for="item in menuItems"
            :key="item.href"
            :to="item.href"
            class="block text-base font-semibold leading-6 text-gray-700 hover:text-gray-900 rounded-md p-2"
            @click="closeMenu"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="pt-20">
      <router-view />
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import FooterComponent from './components/FooterComponent.vue'

const mobileMenuOpen = ref(false)

const menuItems = [
  { name: 'Accueil', href: '/#accueil' },
  { name: 'Mes compétences', href: '/#competences' },
  { name: 'Mes réalisations', href: '/#realisations' },
  { name: 'Mes formations', href: '/#formations' },
  { name: 'Me Contacter', href: '/#contact' }
]

const closeMenu = () => {
  mobileMenuOpen.value = false
}
</script>