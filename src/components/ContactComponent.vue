<template>
  <div class="mx-auto max-w-7xl flex flex-col lg:flex-row justify-center items-center py-28">
    <!-- Section Titre -->
    <div class="max-w-7xl px-6 lg:px-8 w-full">
      <h2 class="text-4xl font-bold tracking-tight text-text sm:text-6xl lg:text-left text-center">
        Contactez-moi
      </h2>
      <p class="mt-6 text-lg leading-8 text-text lg:text-left text-center lg:w-4/5">
        Si vous avez des questions, des propositions ou souhaitez discuter, n'hésitez pas à me contacter.
      </p>
    </div>
  
    <!-- Formulaire de contact -->
    <div class="lg:w-full mx-auto mt-16 max-w-lg sm:mt-20 lg:mt-24 bg-white shadow-lg rounded-lg overflow-hidden p-8 text-left items-center justify-center">
      <form
        class="space-y-6"
        @submit.prevent="submitForm"
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
            class="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
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
            class="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
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
            rows="4"
            required
            class="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        <div class="flex justify-center">
          <button
            type="submit"
            class="mt-4 sm:mt-6 inline-flex items-center px-6 py-2 sm:px-8 sm:py-2 bg-components text-white font-semibold text-base sm:text-lg rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-border focus:ring-opacity-50"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const form = ref({
name: '',
email: '',
message: ''
});

const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    });

    if (response.ok) {
      alert('Email envoyé avec succès');
      form.value.name = '';
      form.value.email = '';
      form.value.message = '';
    } else {
      alert('Erreur lors de l\'envoi de l\'email');
    }
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error);
    alert('Erreur lors de la soumission du formulaire');
  }
};

</script>

<style scoped>
.text-text {
color: #333;
}
.bg-white {
background-color: #fff;
}
</style>
