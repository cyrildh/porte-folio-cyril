<template>
  <div class="relative isolate overflow-hidden py-28 flex items-center justify-center bg-background">
    <div class="max-w-7xl px-6 lg:px-8 w-full">
      <div class="flex flex-col lg:flex-row lg:space-x-16 lg:items-center justify-center">
        <!-- Section de gauche -->
        <div class="lg:w-1/2 flex flex-col justify-center items-center">
          <h2 class="text-4xl font-bold tracking-tight text-text sm:text-6xl text-left">
            Pourquoi travailler avec moi ?
          </h2>
          <p class="mt-6 text-lg leading-8 text-left">
            Mon parcours en alternance m'a permis de mettre en pratique les compétences théoriques acquises en formation, tout en me confrontant aux réalités du terrain.
          </p>
          <p class="mt-6 text-lg leading-8 text-left">
            Au cours de cette période, j'ai développé des compétences approfondies dans l'utilisation de frameworks modernes. J'ai appris à maîtriser des outils de gestion de projets et de versioning, j'ai également acquis une expertise dans l'utilisation d'environnements de développement.
          </p>
        </div>
        <!-- Section de droite -->
        <div class="lg:w-1/2 mt-10 lg:mt-0">
          <div class="grid grid-cols-1 gap-8">
            <div
              v-for="category in categories"
              :key="category.title"
              class="bg-white shadow-lg rounded-lg p-6"
            >
              <CategorySection
                :title="category.title"
                :items="category.items"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import tailwindIcon from '../assets/tailwind2.png';
import nodeIcon from '../assets/node.png';

import CategorySection from './CategorySection.vue';

const categories = [
  {
    title: 'Langages',
    items: [
      { name: 'JavaScript', icon: { type: 'font-awesome', prefix: 'fab', name: 'js', color: '#008573' } },
      { name: 'PHP', icon: { type: 'font-awesome', prefix: 'fab', name: 'php', color: '#008573' } },
      { name: 'Python', icon: { type: 'font-awesome', prefix: 'fab', name: 'python', color: '#008573' } },
      { name: 'HTML, CSS', icon: { type: 'font-awesome', prefix: 'fab', name: 'html5', color: '#008573' } },
      { name: 'MySQL', icon: { type: 'font-awesome', prefix: 'fas', name: 'database', color: '#008573' } },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { name: 'Vue.js', icon: { type: 'font-awesome', prefix: 'fab', name: 'vuejs', color: '#008573' } },
      { name: 'Laravel', icon: { type: 'font-awesome', prefix: 'fab', name: 'laravel', color: '#008573' } },
      { name: 'Node.js', icon: { type: 'image', src: nodeIcon, color: '#008573' } },
    ],
  },
  {
    title: 'Outils',
    items: [
      { name: 'Git', icon: { type: 'font-awesome', prefix: 'fab', name: 'git', color: '#008573' } },
      { name: 'Docker', icon: { type: 'font-awesome', prefix: 'fab', name: 'docker', color: '#008573' } },
      { name: 'Tailwind CSS', icon: { type: 'image', src: tailwindIcon, color: '' } },
    ],
  },
];
</script>
