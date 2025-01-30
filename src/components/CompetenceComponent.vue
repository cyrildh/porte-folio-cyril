<template>
  <section class="relative isolate overflow-hidden py-20 md:py-28 bg-background dark:bg-background-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex flex-col lg:flex-row lg:gap-16 xl:gap-24 items-start justify-center">
        <!-- Section texte -->
        <div class="lg:w-1/2 flex flex-col space-y-8 relative">
          <div class="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl -z-10" />
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-text-primary dark:text-text-inverted">
            <span class="bg-clip-text text-transparent bg-text-accent">Pourquoi</span>
            <br>travailler avec moi ?
          </h2>
          
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 mt-1.5">
                <div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'graduation-cap']" class="w-4 h-4 text-primary" />
                </div>
              </div>
              <p class="text-lg md:text-xl leading-relaxed text-text-secondary dark:text-text-inverted/80">
                Mon parcours en alternance m'a permis de maîtriser <strong class="text-primary dark:text-primary-light">des technologies modernes</strong> tout en menant à bien <strong>des projets clients réels</strong>.
              </p>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 mt-1.5">
                <div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'lightbulb']" class="w-4 h-4 text-primary" />
                </div>
              </div>
              <p class="text-lg md:text-xl leading-relaxed text-text-secondary dark:text-text-inverted/80">
                Expertise dans la <strong>conception d'architectures logicielles</strong> et mise en place de <strong>CI/CD</strong> pour des déploiements efficaces.
              </p>
            </div>
          </div>
        </div>

        <!-- Section compétences -->
        <div class="lg:w-1/2 mt-12 lg:mt-0 w-full">
          <div class="grid grid-cols-1 gap-6">
            <div 
              v-for="(category) in categories"
              :key="category.title"
              class="group relative bg-surface dark:bg-surface-dark rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              >
              <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <CategorySection
                :title="category.title"
                :items="category.items"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CategorySection from './CategorySection.vue';
import tailwindIcon from '../assets/tailwind2.png';
import nodeIcon from '../assets/node.png';

const categories = ref([
  {
    title: 'Langages maîtrisés',
    items: [
      { 
        name: 'JavaScript', 
        icon: { 
          type: 'font-awesome', 
          prefix: 'fab', 
          name: 'js', 
          color: '#F7DF1E',
          bgColor: 'rgba(247, 223, 30, 0.1)'
        },
        level: 90
      },
      { 
        name: 'PHP', 
        icon: { 
          type: 'font-awesome', 
          prefix: 'fab', 
          name: 'php', 
          color: '#777BB4',
          bgColor: 'rgba(119, 123, 180, 0.1)'
        },
        level: 85
      },
      { 
        name: 'Python', 
        icon: { 
          type: 'font-awesome', 
          prefix: 'fab', 
          name: 'python', 
          color: '#3776AB',
          bgColor: 'rgba(55, 118, 171, 0.1)'
        },
        level: 75
      },
      { 
        name: 'HTML/CSS', 
        icon: { 
          type: 'font-awesome', 
          prefix: 'fab', 
          name: 'html5', 
          color: '#E34F26',
          bgColor: 'rgba(227, 79, 38, 0.1)'
        },
        level: 95
      },
      { 
        name: 'SQL', 
        icon: { 
          type: 'font-awesome', 
          prefix: 'fas', 
          name: 'database', 
          color: '#00758F',
          bgColor: 'rgba(0, 117, 143, 0.1)'
        },
        level: 80
      },
    ],
  },
  {
    title: 'Frameworks & Librairies',
    items: [
      { 
        name: 'Vue.js', 
        icon: { 
          type: 'font-awesome', 
          prefix: 'fab', 
          name: 'vuejs', 
          color: '#4FC08D',
          bgColor: 'rgba(79, 192, 141, 0.1)'
        },
        level: 90
      },
      { 
        name: 'Laravel', 
        icon: { 
          type: 'font-awesome', 
          prefix: 'fab', 
          name: 'laravel', 
          color: '#FF2D20',
          bgColor: 'rgba(255, 45, 32, 0.1)'
        },
        level: 85
      },
      { 
        name: 'Node.js', 
        icon: { 
          type: 'image', 
          src: nodeIcon,
          color: '#8CC84B',
          bgColor: 'rgba(140, 200, 75, 0.1)'
        },
        level: 80
      },
    ],
  },
  {
    title: 'Outils & DevOps',
    items: [
      { 
        name: 'Git', 
        icon: { 
          type: 'font-awesome', 
          prefix: 'fab', 
          name: 'git', 
          color: '#F05032',
          bgColor: 'rgba(240, 80, 50, 0.1)'
        },
        level: 90
      },
      { 
        name: 'Docker', 
        icon: { 
          type: 'font-awesome', 
          prefix: 'fab', 
          name: 'docker', 
          color: '#2496ED',
          bgColor: 'rgba(36, 150, 237, 0.1)'
        },
        level: 75
      },
      { 
        name: 'Tailwind', 
        icon: { 
          type: 'image', 
          src: tailwindIcon,
          color: '#06B6D4',
          bgColor: 'rgba(6, 182, 212, 0.1)'
        },
        level: 95
      },
    ],
  },
]);
</script>

<style scoped>
/* Animations personnalisées */
[data-aos="fade-left"] {
  transform: translateX(50px);
  opacity: 0;
  transition: all 0.6s ease-out;
}

[data-aos="fade-right"] {
  transform: translateX(-50px);
  opacity: 0;
  transition: all 0.6s ease-out;
}

/* Animations */
[data-aos] {
  transition: all 0.8s ease-out;
  opacity: 0;
  transform: translateY(30px);
}

[data-aos].aos-animate {
  opacity: 1;
  transform: translateY(0);
}

/* Effet de surbrillance au survol */
.group:hover .skill-progress::after {
  width: 100%;
}
</style>