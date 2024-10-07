<template>
  <div class="mx-auto max-w-7xl flex flex-col lg:flex-row justify-center items-center py-28 px-4">
    <!-- Section Titre -->
    <div class="max-w-7xl px-6 lg:px-8 w-full">
      <h2 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-left text-center">
        Contactez-moi
      </h2>
      <p class="mt-6 text-lg leading-8 text-gray-600 lg:text-left text-center lg:w-4/5">
        Si vous avez des questions, des propositions ou souhaitez discuter, n'hésitez pas à me contacter.
      </p>
    </div>
      
    <!-- Conteneur du Message et du Formulaire de contact -->
    <div class="lg:w-full mx-auto mt-16 sm:mt-20 lg:mt-24 bg-white shadow-2xl rounded-xl overflow-hidden p-8 text-left">
      <!-- Espace réservé pour les messages de succès ou d'erreur -->
      <div class="mb-4 h-16 flex items-center justify-center">
        <transition name="fade">
          <div
            v-if="message"
            :class="`w-full max-w-lg p-4 rounded-lg flex items-center space-x-3 text-white ${messageType === 'success' ? 'bg-components' : 'bg-red-500'}`"
            role="alert"
            aria-live="assertive"
          >
            <svg
              v-if="messageType === 'success'"
              class="w-6 h-6 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                v-if="messageType === 'error'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M6 18L18 6M6 6l12 12"
                @click="closeMessage"
              />   
            </svg>
            &times;
            <span>{{ message }}</span>
          </div>
        </transition>
      </div>

      <!-- Formulaire de contact -->
      <form
        class="space-y-6"
        novalidate
        @submit.prevent="submitForm"
        @input="clearMessages"
      >
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-700"
          >Nom</label>
          <input
            id="name"
            v-model="form.name"
            name="name"
            type="text"
            required
            :class="inputClass(errors.name)"
            class="mt-1 p-3 block w-full border rounded-md shadow-sm focus:outline-none sm:text-sm transition-colors duration-200"
            placeholder="Votre nom"
            aria-describedby="name-error"
          >
          <p
            v-if="errors.name"
            id="name-error"
            class="mt-1 text-sm text-red-600"
          >
            {{ errors.name }}
          </p>
        </div>
      
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700"
          >Email</label>
          <input
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            required
            :class="inputClass(errors.email)"
            class="mt-1 p-3 block w-full border rounded-md shadow-sm focus:outline-none sm:text-sm transition-colors duration-200"
            placeholder="Votre email"
            aria-describedby="email-error"
          >
          <p
            v-if="errors.email"
            id="email-error"
            class="mt-1 text-sm text-red-600"
          >
            {{ errors.email }}
          </p>
        </div>
      
        <div>
          <label
            for="message"
            class="block text-sm font-medium text-gray-700"
          >Message</label>
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            rows="5"
            required
            :class="inputClass(errors.message)"
            class="mt-1 p-3 block w-full border rounded-md shadow-sm focus:outline-none sm:text-sm transition-colors duration-200"
            placeholder="Votre message"
            aria-describedby="message-error"
          />
          <p
            v-if="errors.message"
            id="message-error"
            class="mt-1 text-sm text-red-600"
          >
            {{ errors.message }}
          </p>
        </div>
      
        <div class="flex justify-center">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="mt-4 sm:mt-6 inline-flex items-center px-6 py-2 sm:px-8 sm:py-2 bg-components text-white font-semibold text-base sm:text-lg rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-border focus:ring-opacity-50"
          >
            <span
              v-if="isSubmitting"
              class="mr-3"
            >
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </span>
            Envoyer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

// État du formulaire
const form = ref({
  name: '',
  email: '',
  message: '',
});

// États des messages
const message = ref('');
const messageType = ref(''); // 'success' ou 'error'

// État de soumission
const isSubmitting = ref(false);

// Gestion des erreurs de validation
const errors = ref({
  name: '',
  email: '',
  message: '',
});

// Fonction de validation côté client
const validateForm = () => {
  let valid = true;
  errors.value = { name: '', email: '', message: '' };

  if (!form.value.name.trim()) {
    errors.value.name = 'Le nom est requis.';
    valid = false;
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'L\'email est requis.';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'L\'email n\'est pas valide.';
    valid = false;
  }

  if (!form.value.message.trim()) {
    errors.value.message = 'Le message est requis.';
    valid = false;
  }

  return valid;
};

// Fonction de soumission du formulaire
const submitForm = async () => {
  if (!validateForm()) {
    message.value = 'Veuillez corriger les erreurs ci-dessous.';
    messageType.value = 'error';
    return;
  }

  isSubmitting.value = true;
  message.value = '';
  
  try {
    const response = await fetch('https://ro70yafdcg.execute-api.eu-west-3.amazonaws.com/prod/send-email', { // Utiliser l'URL de production
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur HTTP! statut: ${response.status}`);
    }

    message.value = 'Votre message a été envoyé avec succès !';
    messageType.value = 'success';
    // Réinitialiser les champs du formulaire
    form.value = {
      name: '',
      email: '',
      message: '',
    };
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error);
    message.value = `Erreur lors de la soumission du formulaire : ${error.message}`;
    messageType.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};

// Fonction pour effacer les messages lorsque l'utilisateur commence à taper
const clearMessages = () => {
  if (message.value) {
    message.value = '';
    messageType.value = '';
  }
};

// Fonction pour fermer manuellement les messages
const closeMessage = () => {
  message.value = '';
  messageType.value = '';
};

// Fonction pour appliquer des classes CSS en fonction des erreurs
const inputClass = (error) => {
  return error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:border-gray-300 focus:border-gray-300';
};
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Styles supplémentaires pour améliorer l'apparence */
button:disabled {
  cursor: not-allowed;
}

input, textarea {
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3); /* Ombre douce */
}
</style>
