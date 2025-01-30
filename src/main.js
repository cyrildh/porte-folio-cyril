import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faCode,
  faNetworkWired,
  faProjectDiagram,
  faDesktop,
  faDatabase,
  faLayerGroup,
  faLaptopCode,
  faTasks,
  faShieldAlt,
  faGraduationCap,
  faEnvelope,
  faDownload,
  faRobot,
  faTimes,
  faAward,
  faPalette,
  faBrain,
  faMagic,
  faServer,
  faLightbulb,
  faFileArrowDown
} from '@fortawesome/free-solid-svg-icons'
import {
  faVuejs,
  faLaravel,
  faPython,
  faGit,
  faHtml5,
  faCss3,
  faJs,
  faPhp,
  faDocker,
  faFacebook,
  faLinkedin,
  faGithub,
  faBots,
  faWordpress,
  faNodeJs,
  faDiscord
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faCode,
  faNetworkWired,
  faProjectDiagram,
  faDesktop,
  faDatabase,
  faLayerGroup,
  faLaptopCode,
  faTasks,
  faDownload,
  faShieldAlt,
  faGraduationCap,
  faVuejs,
  faLaravel,
  faPython,
  faGit,
  faCss3,
  faHtml5,
  faJs,
  faPhp,
  faDocker,
  faEnvelope,
  faFacebook,
  faLinkedin,
  faGithub,
  faBots,
  faRobot,
  faTimes,
  faWordpress,
  faAward,
  faNodeJs,
  faPalette,
  faDiscord,
  faBrain,
  faMagic,
  faServer,
  faLightbulb,
  faFileArrowDown
)

// Créez l'application et assignez-la à une variable
const app = createApp(App)

// Enregistrez vos composants et plugins
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(router)

// Montez l'application
app.mount('#app')
