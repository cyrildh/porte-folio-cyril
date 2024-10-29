<template>
  <div>
    <section
      id="accueil"
      class="fade-in"
    >
      <MeComponent />
    </section>
    <section
      id="competences"
      class="fade-in"
    >
      <CompetenceComponent />
    </section>
    <section
      id="realisations"
      class="fade-in"
    >
      <ProjetComponent />
    </section>
    <section
      id="formations"
      class="fade-in"
    >
      <EtudeComponent />
    </section>
    <section
      id="contact"
      class="fade-in"
    >
      <ContactComponent />
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import MeComponent from '../components/MeComponent.vue'
import CompetenceComponent from '../components/CompetenceComponent.vue'
import ProjetComponent from '../components/ProjetComponent.vue'
import EtudeComponent from '../components/EtudeComponent.vue'
import ContactComponent from '../components/ContactComponent.vue'

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      });
    },
    {
      threshold: 0.1,
    }
  )

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section)
  })
})
</script>