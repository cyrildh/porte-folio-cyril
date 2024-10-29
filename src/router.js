// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import LegalMentions from './views/LegalNotices.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mentions-legales',
      name: 'legal',
      component: LegalMentions
    },
    {
      path: '/politique-de-confidentialite',
      name: 'privacy',
      component: PrivacyPolicy
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router