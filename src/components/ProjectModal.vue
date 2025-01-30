<template>
  <Transition name="modal">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="$emit('close')"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6">
        <button 
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          @click="$emit('close')"
        >
          ✖
        </button>

        <!-- Titre & Description -->
        <h2 class="text-2xl font-bold mb-4">{{ feature?.name || 'Aucun projet' }}</h2>
        <p class="text-gray-600 dark:text-gray-300">{{ feature?.descriptionDetaille || 'Pas de description disponible' }}</p>

        <!-- Images -->
        <div v-if="feature?.imageSecondaire?.length" class="grid grid-cols-2 gap-4 mt-4">
          <img 
            v-for="(img, index) in feature.imageSecondaire"
            :key="index"
            :src="img"
            class="rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
            alt="Capture d'écran du projet"
            @click="openImage(img)"
          />
        </div>
      </div>
    </div>
  </Transition>

  <!-- Modale pour afficher l'image en grand -->
  <Transition name="fade">
    <div 
      v-if="fullScreenImage"
      class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      @click="closeImage"
    >
      <img 
        :src="fullScreenImage"
        class="max-w-full max-h-full rounded-lg shadow-lg"
        alt="Image agrandie"
      />
      <button 
        class="absolute top-4 right-4 text-white text-3xl font-bold"
        @click="closeImage"
      >
        ✖
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  isOpen: Boolean,  // Propriété pour ouvrir/fermer la modale
  feature: Object,  // Projet sélectionné
});
defineEmits(['close']); // Déclare l'événement "close"

const fullScreenImage = ref(null);

const openImage = (img) => {
  fullScreenImage.value = img;
};

const closeImage = () => {
  fullScreenImage.value = null;
};
</script>

<style>
/* Effet d'ouverture/fermeture de la modale principale */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Effet d'apparition de l'image agrandie */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
