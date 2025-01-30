<template>
  <footer class="relative border-t border-border/20 bg-background dark:bg-background-dark">
    <!-- Effet de gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-components/5 to-transparent" aria-hidden="true" />

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <!-- Contenu principal -->
      <div class="flex flex-col items-center space-y-8">
        <!-- Texte d'introduction -->
        <div class="text-center space-y-4 max-w-2xl">
          <h2 class="text-2xl font-bold text-text-primary dark:text-text-inverted">
            Collaborons ensemble !
          </h2>
          <p class="text-text-secondary dark:text-text-inverted/80">
            Passionné par la création de solutions numériques innovantes.<br>
            Discutons de votre prochain projet.
          </p>
        </div>

        <!-- Réseaux sociaux avec animations -->
        <a class="flex space-x-6">
          <SocialIcon
            v-for="(icon) in socialIcons"
            :key="icon.name"
            :href="icon.href"
            :icon="icon.icon"
            :label="icon.label"
            class="h-12 w-12 p-3 hover:bg-components/10 rounded-2xl transition-all duration-300 hover:-translate-y-1"
          />
        </a>

        <!-- Liens légaux avec z-index -->
        <nav class="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10">
          <a
            v-for="(link) in legalLinks"
            :key="link.name"
            :href="link.href"
            class="text-sm font-medium text-text-secondary hover:text-components dark:text-text-inverted/80 dark:hover:text-primary-light"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- Copyright -->
        <div 
          class="mt-8 text-sm text-text-secondary dark:text-text-inverted/60"
        >
          © {{ new Date().getFullYear() }} Cyril Dohin. Tous droits réservés.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import SocialIcon from './SocialIcon.vue'

const socialIcons = [
  {
    name: 'GitHub',
    href: 'https://github.com/cyrildh',
    icon: ['fab', 'github'],
    label: 'Visiter mon GitHub'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/cyril-dohin/',
    icon: ['fab', 'linkedin'],
    label: 'Me contacter sur LinkedIn'
  },
]

const legalLinks = [
  { name: 'Mentions légales', href: '/mentions-legales' },
  { name: 'Confidentialité', href: '/politique-de-confidentialite' },
  { name: 'Code source', href: 'https://github.com/cyrildh/porte-folio-cyril' },
]
</script>

<style scoped>
/* Animation d'entrée */
[data-aos] {
  transition: opacity 0.8s ease, transform 0.8s ease;
  opacity: 0;
  transform: translateY(20px);
}

[data-aos].aos-animate {
  opacity: 1;
  transform: translateY(0);
}

/* Assurer que les éléments de fond ne bloquent pas les clics */
.absolute {
  pointer-events: none;
}
</style>
