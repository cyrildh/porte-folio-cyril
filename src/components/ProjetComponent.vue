<template>
  <section class="mx-auto max-w-7xl px-4 lg:px-8 py-28 relative">
    <!-- Effet de fond animé -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-background/20 to-transparent" aria-hidden="true" />

    <!-- Section Titre -->
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-4xl font-bold tracking-tight text-text sm:text-6xl bg-clip-text text-transparent bg-text-primary">
        Mes
        <span class="bg-clip-text text-transparent bg-text-accent">réalisations</span>
      </h2>
      <p class="mt-6 text-lg leading-8 text-text-secondary dark:text-text-inverted/80">
        Chaque réalisation a été une opportunité d'explorer différentes technologies, de collaborer avec des équipes différentes, et de résoudre des défis techniques.
      </p>
    </div>

    <!-- Section Projets -->
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Carte de projet améliorée -->
        <article
          v-for="(feature, index) in features"
          :key="feature.name"
          class="group relative overflow-hidden rounded-2xl bg-surface dark:bg-surface-dark shadow-xl hover:shadow-2xl transition-all duration-300"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div 
            class="cursor-pointer"
            @click="toggleFeature(feature.name)"
          >
            <!-- Image avec effet de survol -->
            <div class="relative h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <img
                :src="feature.image"
                :alt="feature.name"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <!-- Badge d'état -->
              <span v-if="feature.url" class="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                En ligne
              </span>
            </div>

            <!-- Contenu de la carte -->
            <div class="p-6 space-y-4">
              <h3 class="text-2xl font-bold text-text-primary dark:text-text-inverted">
                {{ feature.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-justify line-clamp-3">
                {{ feature.description }}
              </p>
              
              <!-- Technologies avec icônes colorées -->
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tech in feature.technos"
                  :key="tech.name"
                  class="flex items-center px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm"
                  :style="{ backgroundColor: tech.icon.bgColor }"
                >
                  <font-awesome-icon
                    v-if="tech.icon.type === 'font-awesome'"
                    :icon="[tech.icon.prefix, tech.icon.name]"
                    class="h-4 w-4 mr-2"
                    :style="{ color: tech.icon.color }"
                  />
                  <img
                    v-else
                    :src="tech.icon.src"
                    class="h-4 w-4 mr-2"
                    :alt="tech.name + ' icon'"
                  />
                  <span class="font-medium text-text-secondary dark:text-gray-300">
                    {{ tech.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Modale de projet -->
    <ProjectModal
      v-for="feature in features"
      :key="'modal-' + feature.name"
      :feature="feature"
      :is-open="isFeatureClicked(feature.name)"
      @close="toggleFeature(feature.name)"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import AOS from 'aos'
import ProjectModal from './ProjectModal.vue'

// Initialisation des animations
AOS.init({
  once: true,
  duration: 800
})

const featuresClick = ref(new Set())
const features = [
  {
    name: 'Basile - Application anti-gaspi',
    description: 'Application web pour réduire le gaspillage alimentaire...',
    image: require('@/assets/basile.png'),
    descriptionDetaille: 'Développement d’une application web pour réduire le gaspillage alimentaire en permettant aux utilisateurs de vendre et d’acheter des produits alimentaires à prix',
    technos: [
      { 
        name: 'Vue.js', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fab',
          name: 'vuejs',
          color: '#4FC08D',
          bgColor: 'rgba(79, 192, 141, 0.1)'
        }
      },
      { 
        name: 'Node.js', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fas',
          name: 'code',
          color: '#68A063',
          bgColor: 'rgba(104, 160, 99, 0.1)'
        }
      },
      { 
        name: 'Express', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fas',
          name: 'code',
          color: '#000000',
          bgColor: 'rgba(0, 0, 0, 0.1)'
        }
      },
      { 
        name: 'Prisma', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fas',
          name: 'database',
          color: '#0C344B',
          bgColor: 'rgba(12, 52, 75, 0.1)'
        }
      },
      { 
        name: 'PostgreSQL', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fas',
          name: 'database',
          color: '#336791',
          bgColor: 'rgba(51, 103, 145, 0.1)'
        }
      },
      { 
        name: 'MailCatcher', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fas',
          name: 'envelope',
          color: '#FF5733',
          bgColor: 'rgba(255, 87, 51, 0.1)'
        }
      },
      { 
        name: 'Docker', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fab',
          name: 'docker',
          color: '#2496ED',
          bgColor: 'rgba(36, 150, 237, 0.1)'
        }
      }
    ],

    imageSecondaire: [
      require('@/assets/loginBasile.png'),
      require('@/assets/tableauBord.png'),
      require('@/assets/shopBasile.png'),
      require('@/assets/commandeBasile.png'),
      require('@/assets/venteProduit.png'),
    ],  },
      {
        name: 'E-conceptstore - site e-commerce de produits de brocante',
        description:
          `Développement d'un site e-commerce de vente de produits de broquante...`,
        descriptionDetaille:'Conception et réalisation d’un site e-commerce dédié à la vente d’articles de brocante uniques et vintage, réalisé en collaboration avec ma conjointe. Ce projet a permis de combiner nos compétences techniques et notre passion pour les objets anciens afin de créer une plateforme conviviale et esthétiquement attrayante, mettant en valeur des produits uniques pour une clientèle variée.',
        image: require('@/assets/e-conceptstore.png'),
        technos: [
      { 
        name: 'Wordpress', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fab',
          name: 'wordpress',
          color: '#21759B',
          bgColor: 'rgba(33, 117, 155, 0.1)'
        }
      },
      { 
        name: 'PHP', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fab',
          name: 'php',
          color: '#777BB4',
          bgColor: 'rgba(119, 123, 180, 0.1)'
        }
      },
      { 
        name: 'Javascript', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fab',
          name: 'js',
          color: '#F7DF1E',
          bgColor: 'rgba(247, 223, 30, 0.1)'
        }
      },
      { 
        name: 'HTML5', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fab',
          name: 'html5',
          color: '#E34F26',
          bgColor: 'rgba(227, 79, 38, 0.1)'
        }
      },
      { 
        name: 'CSS3', 
        icon: { 
          type: 'font-awesome',
          prefix: 'fab',
          name: 'css3',
          color: '#1572B6',
          bgColor: 'rgba(21, 114, 182, 0.1)'
        }
      }
    ],
    imageSecondaire: [
      require('@/assets/e-conceptstoreCommande.png'),
      require('@/assets/e-conceptstoreshop.png'),
      require('@/assets/e-conceptstorePanier.png'),
      require('@/assets/e-conceptstoreHome.png'),
      require('@/assets/e-conceptstoreFooter.png'),
    ],
    url: 'https://e-conceptstore.fr/',
  },]

function toggleFeature(name) {
  featuresClick.value.has(name) 
    ? featuresClick.value.delete(name)
    : featuresClick.value.add(name)
}

function isFeatureClicked(name) {
  return featuresClick.value.has(name)
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation d'entrée */
[data-aos] {
  opacity: 0;
  transition-property: opacity, transform;
}

[data-aos="fade-up"] {
  transform: translateY(30px);
}

[data-aos].aos-animate {
  opacity: 1;
  transform: translateY(0);
}
</style>