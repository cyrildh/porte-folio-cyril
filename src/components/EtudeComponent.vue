<template>
  <section class="relative isolate px-4 py-28 bg-background dark:bg-background-dark">
    <div class="mx-auto max-w-7xl">
      <h2 class="text-4xl font-bold tracking-tight text-text-primary dark:text-text-inverted sm:text-5xl text-center mb-16">
        <span class="bg-clip-text text-transparent bg-text-accent">Parcours</span> Professionnel
      </h2>

      <!-- Timeline container -->
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-1/2 w-1 bg-gradient-to-b from-primary/20 to-background2 h-full -translate-x-1/2 hidden md:block" />

        <div class="space-y-16 md:space-y-24">
          <!-- Timeline item -->
          <div 
            v-for="(item, index) in timelineItems"
            :key="index"
            class="relative group"
            data-aos="fade-up"
          >
            <!-- Content container -->
            <div class="flex flex-col md:grid md:grid-cols-5 gap-8 items-center">
              <!-- Date (left) -->
              <div class="md:col-span-2 flex justify-end">
                <div class="hidden md:flex items-center gap-4 w-full max-w-xs">
                  <div class="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                  <div class="text-text2 dark:text-primary-light text-2xl font-bold px-4 py-2 rounded-full bg-white dark:bg-surface-dark shadow-lg">
                    {{ item.year }}
                  </div>
                </div>
              </div>

              <!-- Connector (mobile) -->
              <div class="md:hidden absolute left-1/2 -translate-x-1/2 top-8 w-1 h-full bg-gray-200 dark:bg-gray-700" />

              <!-- Card -->
              <div class="md:col-span-3 w-full">
                <div class="relative bg-surface dark:bg-surface-dark rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <!-- Timeline dot -->
                  <div class="absolute -left-4 top-8 md:-left-8 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                    <font-awesome-icon 
                      :icon="item.icon" 
                      class="w-4 h-4 text-white" 
                    />
                  </div>

                  <h3 class="text-2xl font-bold text-text-primary dark:text-text-inverted mb-4">
                    {{ item.title }}
                  </h3>
                  
                  <p class="text-gray-600 dark:text-gray-300 mb-6">
                    {{ item.description }}
                  </p>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2">
                    <div 
                      v-for="(tag, tagIndex) in item.tags"
                      :key="tagIndex"
                      class="flex items-center px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm"
                    >
                      <font-awesome-icon 
                        :icon="tag.icon"
                        class="w-4 h-4 mr-2 text-primary dark:text-primary-light"
                      />
                      <span class="text-text-secondary dark:text-gray-300">
                        {{ tag.name }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const timelineItems = ref([
  {
    year: '2024',
    title: 'Master Développeur Full Stack',
    icon: ['fas', 'graduation-cap'],
    description: 'Formation avancée pour devenir un développeur full-stack avec maîtrise des frameworks modernes et gestion des projets complexes.',
    tags: [
      { name: 'Développement Avancé', icon: ['fas', 'laptop-code'] },
      { name: 'Gestion de Projets', icon: ['fas', 'tasks'] },
      { name: 'Sécurité des Données', icon: ['fas', 'shield-alt'] },
      { name: 'Diplôme Bac+5', icon: ['fas', 'award'] }
    ]
  },
  {
    year: '2023',
    title: 'Développeur Full Stack - Talkme',
    icon: ['fas', 'laptop-code'],
    description: "Développement d'ERP/MES en Vue.js/Laravel et création d'une application Node.js avec MongoDB.",
    tags: [
      { name: 'Vue.js', icon: ['fab', 'vuejs'] },
      { name: 'Laravel', icon: ['fab', 'laravel'] },
      { name: 'Node.js', icon: ['fab', 'node-js'] },
      { name: 'Docker', icon: ['fab', 'docker'] }
    ]
  },
  {
    year: '2022',
    title: 'Bachelor Développeur',
    icon: ['fas', 'graduation-cap'],
    description: 'Formation intensive en développement fullstack et gestion de bases de données.',
    tags: [
      { name: 'UI/UX', icon: ['fas', 'palette'] },
      { name: 'Bases de Données', icon: ['fas', 'database'] },
      { name: 'Architecture Logicielle', icon: ['fas', 'project-diagram'] },
      { name: 'Diplôme Bac+3', icon: ['fas', 'award'] }
    ]
  },
  {
    year: '2021',
    title: 'Développeur Bot Discord - Ody-cd',
    icon: ['fas', 'robot'],
    description: "Création d'un bot Discord avec analyse de sentiments et automatisation de publications.",
    tags: [
      { name: 'API Discord', icon: ['fab', 'discord'] },
      { name: 'Analyse NLP', icon: ['fas', 'brain'] },
      { name: 'Automatisation', icon: ['fas', 'magic'] }
    ]
  },
  {
    year: '2020',
    title: 'BTS Services Numériques',
    icon: ['fas', 'network-wired'],
    description: 'Formation initiale en développement logiciel et administration réseau.',
    tags: [
      { name: 'Réseaux', icon: ['fas', 'network-wired'] },
      { name: 'Développement Logiciel', icon: ['fas', 'code'] },
      { name: 'Systèmes', icon: ['fas', 'server'] },
      { name: 'Diplôme Bac+2', icon: ['fas', 'award'] }
    ]
  }
])
</script>
<style scoped>
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

/* Gradient line animation */
.group:hover .timeline-line {
  background: linear-gradient(to bottom, #0D9488, #5EEAD4);
}
</style>