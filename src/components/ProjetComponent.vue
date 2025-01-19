<template>
  <div class="mx-auto max-w-7xl lg:px-8 px-4 flex flex-col justify-center items-center py-28">
    <!-- Section Titre -->
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-4xl font-bold tracking-tight text-text sm:text-6xl">
        Mes réalisations
      </h2>
      <p class="mt-6 text-lg leading-8 text-text">
        Chaque réalisation a été une opportunité d'explorer différentes technologies, de collaborer avec des équipes différentes, et de résoudre des défis techniques.
      </p>
    </div>

    <!-- Section Projets -->
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
      <!-- Grille principale -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Cartes de projets -->
        <div
          v-for="(feature) in features"
          :key="feature.name"
          class="w-full"
        >
          <!-- Carte principale -->
          <div
            class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            @click="toggleFeature(feature.name)"
          >
            <!-- Image du projet -->
            <div class="flex justify-center items-center h-56 bg-gray-100">
              <img
                :src="feature.image"
                :alt="feature.name"
                class="object-cover h-full"
              />
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
                  class="flex items-center bg-gray-100 px-3 py-1 rounded-full shadow-sm"
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

          <!-- Modale de projet -->
          <div
            v-if="isFeatureClicked(feature.name)"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            @click="toggleFeature(feature.name)"
          >
            <div
              class="relative bg-white w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 max-h-[90vh] rounded-lg shadow-lg p-6 overflow-auto"
              @click.stop
            >
              <!-- Bouton de fermeture -->
              <button
                @click="toggleFeature(feature.name)"
                class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <font-awesome-icon icon="fa fa-times" class="h-5 w-5" />
              </button>

              <!-- Contenu de la modale -->
              <div>
                <h3 class="text-2xl font-bold text-text mb-4">
                  {{ feature.name }}
                </h3>
                <h4 class="text-sl font-bold text-text mb-4">
                  Capture d'écran du projet :
                </h4>
                <Carousel v-bind="config">
                  <Slide
                    v-for="(img, index) in feature.imageSecondaire"
                    :key="index"
                  >
                    <img
                      :src="img"
                      :alt="feature.name"
                      class="object-contain max-h-96 w-full rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                      @click="openImageModal(img)"
                    />
                  </Slide>

                  <template #addons>
                    <Navigation />
                    <Pagination />
                  </template>
                </Carousel>
                <h4 class="text-sl font-bold text-text mb-4">
                  Venez découvrir le projet :
                </h4>
                <a :href="feature.url" target="_blank" class="text-blue-500 hover:underline">
                  {{ feature.url }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- Modale d'image agrandie -->
  <div
    v-if="isImageModalOpen"
    class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    @click="closeImageModal"
  >
    <div class="relative">
      <!-- Bouton de fermeture -->
      <button
        @click="closeImageModal"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
        <font-awesome-icon icon="fa fa-times" class="h-5 w-5" />
      </button>

      <!-- Image agrandie -->
      <img
        :src="currentImage"
        alt="Image agrandie"
        class="max-w-full max-h-screen rounded-lg shadow-lg"
        @click.stop
      />
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
// Variables et fonctions
const isImageModalOpen = ref(false);
const currentImage = ref('');
const featuresClick = ref([]);
const features = [
  {
    name: 'Basile',
    description:
      'Contribution au développement d’une application web innovante, mettant en relation maraîchers et restaurateurs, permettant ainsi de sauver des fruits et légumes déclassés.',
    image: require('@/assets/basile.png'),
    technos: [
      { name: 'Vue.js', icon: ['fab', 'vuejs'] },
      { name: 'Node.js', icon: ['fas', 'code'] },
      { name: 'Express', icon: ['fas', 'code'] },
      { name: 'Prisma', icon: ['fas', 'database'] },
      { name: 'PostgreSQL', icon: ['fas', 'database'] },
      { name: 'MailCatcher', icon: ['fas', 'envelope'] },
      { name: 'Docker', icon: ['fab', 'docker'] },
    ],
    imageSecondaire: [
      require('@/assets/loginBasile.png'),
      require('@/assets/tableauBord.png'),
      require('@/assets/shopBasile.png'),
      require('@/assets/commandeBasile.png'),
      require('@/assets/venteProduit.png'),
    ],
    url: 'https://www.basile-app.fr/',
  },
  {
    name: 'e-conceptstore',
    description:
      `Développement d'un site e-commerce de vente de produits de broquante avec wordpress javascript et css personnalisé.`,
    image: require('@/assets/e-conceptstore.png'),
    technos: [
      { name: 'Wordpress', icon: ['fab', 'wordpress'] },
      { name: 'PHP', icon: ['fab', 'php'] },
      { name: 'Javascript', icon: ['fab', 'js'] },
      { name: 'HTML5', icon: ['fab', 'html5'] },
      { name: 'CSS3', icon: ['fab', 'css3'] },
    ],
    imageSecondaire: [
      require('@/assets/e-conceptstoreCommande.png'),
      require('@/assets/e-conceptstoreshop.png'),
      require('@/assets/e-conceptstorePanier.png'),
      require('@/assets/e-conceptstoreHome.png'),
      require('@/assets/e-conceptstoreFooter.png'),
    ],
    url: 'https://e-conceptstore.fr/',
  },
];

// Gestion des modales
function toggleFeature(name) {
  if (featuresClick.value.includes(name)) {
    featuresClick.value = featuresClick.value.filter(
      (feature) => feature !== name
    );
  } else {
    featuresClick.value.push(name);
  }
}

function isFeatureClicked(name) {
  return featuresClick.value.includes(name);
}
// Gestion de la modale d'image
function openImageModal(img) {
  currentImage.value = img;
  isImageModalOpen.value = true;
}

function closeImageModal() {
  isImageModalOpen.value = false;
}

const config = {
  itemsToShow: 1,
  transition: 500, // Durée de la transition en ms
  mouseDrag: true, // Permet le swipe avec la souris
  touchDrag: true, // Permet le swipe sur appareils tactiles
  infiniteScroll: true, // Boucle infinie des slides
};
</script>

<style scoped>
/* Ajout des styles si nécessaire */
</style>
