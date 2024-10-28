<template>
  <div class="mx-auto max-w-7xl lg:px-8 px-4 flex flex-col justify-center items-center py-28">
    <!-- Section Titre -->
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-4xl font-bold tracking-tight text-text sm:text-6xl">
        Mes réalisations
      </h2>
      <p class="mt-6 text-lg leading-8 text-text">
        Chaque réalisations a été une opportunité d'explorer différentes technologies, de collaborer avec des équipes différentes, et de résoudre des défis techniques.
      </p>
    </div>

    <!-- Section Projets -->
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 ">
        <div
          v-for="feature in features"
          :key="feature.name"
          class="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <!-- Image du projet -->
          <div class="flex justify-center items-center h-56 bg-gray-100">
            <img
              :src="feature.image"
              :alt="feature.name"
              class="object-cover h-full"
            >
          </div>
          <!-- Contenu du projet -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-text mb-2">
              {{ feature.name }}
            </h3>
            <p class="text-gray-600 text-justify mb-4">
              {{ feature.description }}
            </p>
            <!-- Technologies utilisées -->
            <h4 class="text-xl font-semibold text-text2 mb-2">
              Technologies :
            </h4>
            <ul class="flex flex-wrap gap-4">
              <li
                v-for="tech in feature.technos"
                :key="tech.name"
                class="flex items-center bg-gray-100 px-3 py-1 rounded-full"
              >
                <font-awesome-icon
                  :icon="tech.icon"
                  class="h-5 w-5 text-text2 mr-2"
                  aria-hidden="true"
                />
                <span class="text-text">{{ tech.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const features = [
  {
    name: 'Basile',
    description:
      'Contribution au développement d’une application web innovante, mettant en relation maraîchers et restaurateurs, permettant ainsi de sauver des fruits et légumes déclassés.',
    image: require('@/assets/basile.png'),
    technos: [
      { name: 'Vue.js', icon: ['fab', 'vuejs'] },
      { name: 'Node.js', icon: ['fas','code'] },
      { name: 'Express', icon: ['fas','code'] },
      { name: 'Prisma', icon: ['fas', 'database'] },
      { name: 'PostgreSQL', icon: ['fas', 'database'] },
      { name: 'MailCatcher', icon: ['fas', 'envelope'] },
    ],
  },
  {
    name: 'FinBot',
    description:
      'Développement d’une application permettant de pouvoir placer de l’argent automatiquement grâce à un algorithme.',
    image: require('@/assets/finbot.png'),
    technos: [
      { name: 'Python', icon: ['fab', 'python'] },
      { name: 'Flask', icon: ['fas', 'code'] },
      { name: 'NumPy', icon: ['fas', 'code'] },
      { name: 'Pandas', icon: ['fas', 'code'] },
      { name: 'Matplotlib', icon: ['fas', 'code'] },
      { name: 'Binance API', icon: ['fas', 'code'] },
    ],
  },
  {
    name: 'Bot Discord',
    description:
      "Développement d'un bot utilisant l'API Discord, analyse des données via Google Sentiment, et publication automatique sur Discord.",
    image: require('@/assets/discord-bot.jpg'),
    technos: [
      { name: 'Node.js', icon: ['fas', 'code'] },
      { name: 'Discord', icon: ['fas', 'robot'] },
      { name: 'Google Sentiment API', icon: ['fas', 'code'] },
    ],
  },
  {
    name: 'ERP et MES - Talkme',
    description:
      "Contribuez au développement d'ERP et de MES en Vue.js et Laravel, et d'une application Node.js pour la centralisation de données en MongoDB.",
    image: require('@/assets/erp-mes.png'),
    technos: [
      { name: 'Vue.js', icon: ['fab', 'vuejs'] },
      { name: 'Laravel', icon: ['fab', 'laravel'] },
      { name: 'MongoDB', icon: ['fas', 'database'] },
      { name: 'Docker', icon: ['fab', 'docker'] },
      { name: 'Sql', icon: ['fas', 'database'] },

    ],
  },
];
</script>

<style scoped>
/* Styles personnalisés pour les projets */
.bg-gray-100 {
  background-color: #f5f5f5;
}
</style>