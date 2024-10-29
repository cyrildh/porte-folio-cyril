<!--Footer container-->
<template>
  <footer
    class="flex flex-col items-center bg-background text-center text-surface "
  >
    <div class="container pt-9">
      <!-- Social media icons container -->
      <div class="mb-6 flex justify-center space-x-2">
        <div class="mt-6 flex justify-center space-x-4">
          <SocialIcon
            v-for="icon in socialIcons"
            :key="icon.name"
            :href="icon.href"
            :icon="icon.icon"
            :label="icon.label"
          />
        </div>
      </div>

      <!--Copyright section-->
      <div class="w-full bg-background p-4 text-center">
        © 2024 Copyright: Cyril Dohin
      </div>
      <div class="w-full bg-background p-4 text-center">
        <a
          href="/mentions-legales"
          class="text-surface hover:underline mx-2"
        >Mentions légales</a>
        <a
          href="/politique-de-confidentialite"
          class="text-surface hover:underline mx-2"
        >Politique de confidentialité</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import SocialIcon from './SocialIcon.vue'

const socialIcons = [
  {
    name: 'GitHub',
    href: 'https://github.com/cyrildh', // Remplacez par votre lien GitHub
    icon: ['fab', 'github'],
    label: 'GitHub',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/cyril-dohin/', // Remplacez par votre lien LinkedIn
    icon: ['fab', 'linkedin'],
    label: 'LinkedIn',
  },
]
</script>