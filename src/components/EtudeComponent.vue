<template>
  <div class="relative isolate px-4 py-28 flex flex-col items-center justify-center bg-background">
    <h2 class="text-4xl font-bold tracking-tight text-text sm:text-5xl text-center mb-12">
      Mes formations & Expériences
    </h2>
    <div class="w-full max-w-5xl">
      <!-- Conteneur de la timeline -->
      <div class="relative">
        <!-- Ligne verticale (affichée uniquement sur desktop) -->
        <div class="hidden md:block border-l-4 border-text2 absolute h-full left-1/2 transform -translate-x-1/2 z-0" />

        <!-- Éléments de la timeline -->
        <div
          v-for="(formation, index) in formations"
          :key="formation.year"
          class="mb-16 flex flex-col md:flex-row items-center w-full"
        >
          <div
            :class="{
              'md:flex-row': index % 2 === 0,
              'md:flex-row-reverse': index % 2 !== 0,
              'flex': true,
              'items-center': true,
              'justify-between': true,
              'w-full': true,
            }"
          >
            <!-- Contenu pour mobile -->
            <div class="md:hidden w-full">
              <div class="bg-white shadow-xl rounded-lg p-6">
                <div class="flex items-center mb-4">
                  <div class="bg-text2 text-white font-semibold text-base w-12 h-12 flex items-center justify-center rounded-full shadow-lg mr-2">
                    {{ formation.year }}
                  </div>
                  <h3 class="text-xl font-bold text-text">
                    {{ formation.title }}
                  </h3>
                </div>
                <p class="text-gray-600 text-justify text-sm">
                  {{ formation.description }}
                </p>
                <ul class="mt-4 space-y-2">
                  <li
                    v-for="item in formation.items"
                    :key="item.name"
                    class="flex items-start"
                  >
                    <font-awesome-icon
                      :icon="item.icon"
                      class="h-4 w-4 text-text2 mr-2 mt-1"
                      aria-hidden="true"
                    />
                    <span class="font-semibold text-text text-sm text-left">
                      {{ item.name }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Contenu pour desktop -->
            <div class="hidden md:flex w-full md:w-5/12">
              <div class="bg-white shadow-xl rounded-lg p-6">
                <h3 class="mb-2 text-2xl font-bold text-text">
                  {{ formation.title }}
                </h3>
                <p class="text-gray-600 text-justify">
                  {{ formation.description }}
                </p>
                <ul class="mt-4 space-y-2">
                  <li
                    v-for="item in formation.items"
                    :key="item.name"
                    class="flex items-start"
                  >
                    <font-awesome-icon
                      :icon="item.icon"
                      class="h-5 w-5 text-text2 mr-2 mt-1"
                      aria-hidden="true"
                    />
                    <span class="font-semibold text-text text-left">
                      {{ item.name }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Cercle de l'année (affiché uniquement sur desktop) -->
            <div class="hidden md:flex w-full md:w-1/12 justify-center items-center z-10 my-8 md:my-0">
              <div class="bg-text2 text-white font-semibold text-lg w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
                {{ formation.year }}
              </div>
            </div>
            <!-- Espace vide pour desktop -->
            <div class="hidden md:block w-5/12" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'EtudeComponent',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      formations: [
        {
          year: '2024',
          title: 'Master Développeur Full Stack',
          description:
            "Formation avancée pour devenir un développeur full-stack avec maîtrise des frameworks modernes et gestion des projets complexes.",
          items: [
            { name: 'Développement Avancé', icon: ['fas', 'laptop-code'] },
            { name: 'Conception et Gestion de Projets', icon: ['fas', 'tasks'] },
            { name: 'Sécurité et Gestion des Données', icon: ['fas', 'shield-alt'] },
            { name: 'Diplôme Bac+5', icon: ['fas', 'graduation-cap'] },
          ],
        },
        {
          year: '2023',
          title: 'Développeur Talkme',
          description:
            "Contribué au développement d'ERP et de MES en Vue.js et Laravel, développement d'une application Node.js pour la centralisation de données en MongoDB et gestion avec Docker.",
          items: [
            { name: 'Développement ERP et MES', icon: ['fas', 'desktop'] },
            { name: 'Application Node.js', icon: ['fas', 'code'] },
            { name: 'Gestion Docker', icon: ['fab', 'docker'] },
          ],
        },
        {
          year: '2022',
          title: 'Bachelor Développeur',
          description:
            "Mise en avant du développement d’applications et des compétences en bases de données et conception UI/UX.",
          items: [
            { name: "Conception d'Interfaces Utilisateur", icon: ['fas', 'desktop'] },
            { name: 'Gestion des Données', icon: ['fas', 'database'] },
            { name: 'Développement Multicouche', icon: ['fas', 'layer-group'] },
            { name: 'Diplôme Bac+3', icon: ['fas', 'graduation-cap'] },
          ],
        },
        {
          year: '2021',
          title: 'Développeur Ody-cd',
          description:
            "Développement d'un bot utilisant l'API Discord, analyse des données via Google Sentiment, publication automatique sur Discord.",
          items: [
            { name: 'API Discord', icon: ['fas', 'network-wired'] },
            { name: 'Analyse Google Sentiment', icon: ['fas', 'code'] },
            { name: 'Gestion des Messages Discord', icon: ['fab', 'bots'] },
          ],
        },
        {
          year: '2020',
          title: 'BTS Services Numériques',
          description:
            "Formation initiale pour acquérir des compétences en développement logiciel, administration des réseaux, et intégration de systèmes.",
          items: [
            { name: 'Conception et Développement de Logiciels', icon: ['fas', 'code'] },
            { name: 'Administration Réseaux', icon: ['fas', 'network-wired'] },
            { name: 'Intégration de Systèmes', icon: ['fas', 'project-diagram'] },
            { name: 'Diplôme Bac+2', icon: ['fas', 'graduation-cap'] },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Styles personnalisés pour la timeline */
.relative::before {
  content: '';
  position: absolute;
  width: 2px;
  background-color: var(--tw-border-opacity);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
}

@media (max-width: 768px) {
  /* Masquer la ligne verticale sur mobile */
  .relative::before,
  .border-l-4 {
    display: none;
  }
  /* Réinitialiser les marges des éléments */
  .mb-16 {
    margin-bottom: 2rem;
  }
}
</style>