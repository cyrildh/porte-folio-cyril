<template>
  <div id="app" class="min-h-screen bg-background dark:bg-background-dark">
    <header class="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm">
      <nav class="mx-auto max-w-7xl px-6 lg:px-8 p-2" aria-label="Global">
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <div class="flex shrink-0 items-center">
            <router-link 
              to="/" 
              class="text-xl font-bold tracking-tight text-primary-dark hover:text-primary-dark/80 dark:text-primary-light"
            >
              Cyril Dohin
            </router-link>
          </div>

          <!-- Menu desktop -->
          <div class="hidden lg:flex lg:gap-x-8">
            <router-link 
              v-for="item in menuItems" 
              :key="item.href" 
              :to="item.href"
              class="rounded-md px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-hover hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 dark:text-text-inverted dark:hover:bg-primary-dark/20"
              active-class="bg-hover text-primary-dark dark:bg-primary-dark/30"
            >
              {{ item.name }}
            </router-link>
          </div>

          <!-- Menu burger mobile -->
          <div class="flex lg:hidden">
            <button 
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text-primary transition-colors hover:bg-hover hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 dark:text-text-inverted"
              @click="mobileMenuOpen = !mobileMenuOpen"
              :aria-expanded="mobileMenuOpen"
            >
              <span class="sr-only">Ouvrir le menu</span>
              <Bars3Icon 
                class="h-6 w-6" 
                :class="{'text-primary-dark dark:text-primary-light': mobileMenuOpen}" 
                aria-hidden="true" 
              />
            </button>
          </div>
        </div>
      </nav>

      <!-- Menu mobile -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div 
          v-show="mobileMenuOpen"
          class="absolute inset-x-0 z-50 lg:hidden"
          role="dialog"
        >
          <div class="bg-surface shadow-lg ring-1 ring-border/10 dark:bg-surface-dark dark:ring-border-dark/20">
            <div class="space-y-1 px-5 pb-3 pt-4">
              <router-link
                v-for="item in menuItems"
                :key="item.href"
                :to="item.href"
                class="block rounded-md px-3 py-2 text-base font-medium text-text-primary hover:bg-hover hover:text-primary-dark dark:text-text-inverted dark:hover:bg-primary-dark/20"
                @click="closeMenu"
                active-class="bg-hover text-primary-dark dark:bg-primary-dark/30"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Contenu principal -->
    <main class="pt-24">
      <router-view />
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import FooterComponent from './components/FooterComponent.vue';

const mobileMenuOpen = ref(false);

const menuItems = [
  { name: 'Accueil', href: '/#accueil' },
  { name: 'Mes compétences', href: '/#competences' },
  { name: 'Mes réalisations', href: '/#realisations' },
  { name: 'Mes formations', href: '/#formations' },
  { name: 'Me Contacter', href: '/#contact' }
];

const closeMenu = () => {
  mobileMenuOpen.value = false;
};
</script>