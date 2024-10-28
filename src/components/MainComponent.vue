<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-nav shadow">
    <nav
      class="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <p>
          Cyril Dohin
        </p>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a
          href="#accueil"
          class="text-sm font-semibold leading-6 text-text"
        >Accueil</a>
        <a
          href="#competences"
          class="text-sm font-semibold leading-6 text-text"
        >Mes compétences</a>
        <a
          href="#realisations"
          class="text-sm font-semibold leading-6 text-text"
        >Mes réalisations</a>
        <a
          href="#formations"
          class="text-sm font-semibold leading-6 text-text"
        >Mes formations</a>
        <a
          href="#contact"
          class="text-sm font-semibold leading-6 text-text"
        >Me Contacter</a>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden"
    >
      <div class="space-y-2 px-2 pb-3 pt-2">
        <a
          href="#accueil"
          class="block text-base font-semibold leading-6 text-text rounded-md p-2"
          @click="closeMenu"
        >Accueil</a>
        <a
          href="#competences"
          class="block text-base font-semibold leading-6 text-text rounded-md p-2"
          @click="closeMenu"
        >Mes compétences</a>
        <a
          href="#realisations"
          class="block text-base font-semibold leading-6 text-text rounded-md p-2"
          @click="closeMenu"
        >Mes réalisations</a>
        <a
          href="#formations"
          class="block text-base font-semibold leading-6 text-text rounded-md p-2"
          @click="closeMenu"
        >Mes formations</a>
        <a
          href="#contact"
          class="block text-base font-semibold leading-6 text-text rounded-md p-2"
          @click="closeMenu"
        >Contact</a>
      </div>
    </div>
  </header>

  <div>
    <section
      id="accueil"
      class="fade-in"
    >
      <MeComponent />
    </section>
    <section
      id="competences"
      class="fade-in"
    >
      <CompetenceComponent />
    </section>
    <section
      id="realisations"
      class="fade-in"
    >
      <ProjetComponent />
    </section>
    <section
      id="formations"
      class="fade-in"
    >
      <EtudeComponent />
    </section>
    <section
      id="contact"
      class="fade-in"
    >
      <ContactComponent />
    </section>
    <FooterComponent />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import CompetenceComponent from './CompetenceComponent.vue';
import ProjetComponent from './ProjetComponent.vue';
import FooterComponent from './FooterComponent.vue';
import EtudeComponent from './EtudeComponent.vue';
import MeComponent from './MeComponent.vue';
import ContactComponent from './ContactComponent.vue';

const mobileMenuOpen = ref(false);

function closeMenu() {
  mobileMenuOpen.value = false;
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });
});
</script>
