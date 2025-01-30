<template>
  <section class="relative mx-auto max-w-7xl px-4 py-28">
    <!-- Fond gradiant -->
    <div class="absolute inset-0 bg-gradient-to-br from-background/20 via-primary/10 to-background/30 -z-10" aria-hidden="true" />

    <div class="max-w-2xl mx-auto lg:max-w-4xl">
      <!-- En-tête -->
      <div class="text-center space-y-6 mb-16">
        <h2 class="text-4xl font-extrabold tracking-tight text-text-primary dark:text-text-inverted sm:text-6xl">
          Travaillons
          <span class="text-text-accent">ensemble</span>
        </h2>
        <p class="text-xl text-text-secondary dark:text-text-inverted/80">
          Discutons de votre projet et trouvons la meilleure solution
        </p>
      </div>

      <!-- Carte du formulaire -->
      <div class="relative bg-white dark:bg-surface-dark backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden p-8 lg:p-12"
      data-aos="fade-up">
        <!-- Messages d'état -->
        <transition name="slide-fade">
          <div
            v-if="message"
            :class="[
              'absolute inset-x-0 top-0 p-4 text-center text-sm font-medium',
              messageType === 'success' 
                ? 'bg-primary/90 text-white' 
                : 'bg-red-500/90 text-white'
            ]"
            role="alert"
            aria-live="assertive"
          >
            {{ message }}
            <button 
              @click="closeMessage"
              class="absolute right-4 top-1/2 -translate-y-1/2"
              aria-label="Fermer le message"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
        </transition>

        <!-- Formulaire -->
        <form 
          @submit.prevent="submitForm"
          class="space-y-8"
          novalidate
        >
          <!-- Champ Nom -->
          <FormInput
            label="Votre nom"
            id="name"
            v-model="form.name"
            :error="errors.name"
            icon="user"
            placeholder="Jean Dupont"
            @input="clearErrors('name')"
          />

          <!-- Champ Email -->
          <FormInput
            label="Votre email"
            id="email"
            type="email"
            v-model="form.email"
            :error="errors.email"
            icon="envelope"
            placeholder="jean@exemple.com"
            @input="clearErrors('email')"
          />

          <!-- Champ Message -->
          <FormTextarea
            label="Votre message"
            id="message"
            v-model="form.message"
            :error="errors.message"
            :rows="5"
            placeholder="Décrivez votre projet..."
            @input="clearErrors('message')"
          />

          <!-- Bouton de soumission -->
          <div class="relative">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/30 gap-3"
              :aria-busy="isSubmitting"
            >
              <span class="flex items-center justify-center gap-3">
                <span v-if="isSubmitting" class="flex items-center">
                  <Spinner class="h-5 w-5 animate-spin" />
                </span>
                <span>{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}</span>
              </span>
            </button>
            
            <!-- Barre de progression -->
            <div 
              v-if="isSubmitting"
              class="absolute -bottom-2 h-1 bg-primary/20 w-full rounded-full overflow-hidden"
            >
              <div class="h-full bg-primary animate-progress" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import FormInput from './Contact/FormInput.vue'
import FormTextarea from './Contact/FormTextarea.vue'
import Spinner from './Contact/Spinner.vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const message = ref('')
const messageType = ref('')
const isSubmitting = ref(false)

const validateForm = () => {
  let isValid = true
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.name.trim()) {
    errors.name = 'Ce champ est requis'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Ce champ est requis'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Format d\'email invalide'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Ce champ est requis'
    isValid = false
  } else if (form.message.length < 20) {
    errors.message = 'Le message doit contenir au moins 20 caractères'
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validateForm()) {
    messageType.value = 'error'
    message.value = 'Veuillez corriger les erreurs dans le formulaire'
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch('https://cyrildohin.fr/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (!response.ok) throw new Error('Erreur lors de l\'envoi')

    messageType.value = 'success'
    message.value = 'Message envoyé avec succès !'
    Object.assign(form, { name: '', email: '', message: '' })
    
  } catch (error) {
    messageType.value = 'error'
    message.value = error.message || 'Une erreur est survenue'
  } finally {
    isSubmitting.value = false
  }
}

const closeMessage = () => {
  message.value = ''
  messageType.value = ''
}

const clearErrors = (field) => {
  errors[field] = ''
  if (message.value) closeMessage()
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@keyframes progress {
  from { transform: translateX(-100%); }
  to { transform: translateX(200%); }
}

.animate-progress {
  animation: progress 2s linear infinite;
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
</style>