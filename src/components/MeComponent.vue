<template>
  <section class="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-background2 dark:from-background-dark dark:to-background-dark/90">
    <!-- Effets de fond -->
    <div class="absolute inset-0 bg-noise opacity-10 pointer-events-none -z-10" />
    
    <!-- Contenu principal -->
    <div class="relative z-10 px-4 lg:px-8 max-w-8xl w-full">
      <div class="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        <!-- Conteneur Avatar -->
        <div class="relative w-full max-w-2xl aspect-square lg:aspect-[4/3]">
          <div 
            id="avatar-container"
            class="relative h-full w-full"
          >
            <!-- Écran de chargement amélioré -->
            <div 
              id="avatar-loading"
              v-show="isLoading"
              class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity"
            >
              <div class="flex space-x-2">
                <div class="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
                <div class="w-4 h-4 bg-primary rounded-full animate-bounce delay-100"></div>
                <div class="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
          
          <!-- Badge animé -->
          <span class="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-fade-in-up">
            {{ labelText }}
          </span>
        </div>

        <!-- Contenu texte -->
        <div class="text-center lg:text-left space-y-6 max-w-2xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary dark:text-text-inverted leading-tight">
            <span class="text-text-accent">{{ name }}</span>
            <br>
            <span class="text-2xl md:text-3xl lg:text-4xl font-semibold text-text-secondary dark:text-text-inverted/80 mt-2 block">
              {{ title }}
            </span>
          </h1>

          <!-- CTA amélioré -->
          <a
            :href="cvLink"
            download
            class="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/30 gap-3"
          >
            <font-awesome-icon 
              :icon="['fas', 'file-arrow-down']" 
              class="h-5 w-5"
            />
            Télécharger mon CV
          </a>

          <!-- Réseaux sociaux avec animations -->
          <div class="flex justify-center lg:justify-start space-x-6 pt-4">
            <SocialIcon
              v-for="icon in socialIcons"
              :key="icon.name"
              :href="icon.href"
              :icon="icon.icon"
              :label="icon.label"
              class="hover:-translate-y-1 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SocialIcon from './SocialIcon.vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Données statiques
const name = 'Développeur'
const title = 'Full Stack'
const labelText = 'Cyril Dohin'
const cvLink = '/CV_cyril_dohin.pdf'

// Icônes sociales
const socialIcons = [
  { name: 'GitHub', href: 'https://github.com/cyrildh', icon: ['fab', 'github'], label: 'GitHub' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/cyril-dohin/', icon: ['fab', 'linkedin'], label: 'LinkedIn' },
]

// Références Three.js
let renderer, scene, camera, controls, mixer
let waveAction, stumbleAction
let animationId

const clock = new THREE.Clock()
const isLoading = ref(true)

// Fonction de chargement du modèle
async function loadModel() {
  try {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)

    const container = document.getElementById('avatar-container')
    if (!container) throw new Error('Avatar container not found')

    return new Promise((resolve, reject) => {
      loader.load(
        'avatar.glb',
        (gltf) => {
          resolve(gltf)
          isLoading.value = false
        },
        undefined,
        (error) => {
          isLoading.value = false
          reject(error)
        }
      )
    })
  } catch (error) {
    console.error('Erreur lors du chargement du modèle :', error)
    isLoading.value = false
    throw error
  }
}


// Fonction de configuration de la scène
function setupScene(gltf) {
  const container = document.getElementById('avatar-container')

  // Initialisation du renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // Réduction du pixel ratio
  renderer.shadowMap.enabled = false // Désactivation des ombres
  container.appendChild(renderer.domElement)

  // Initialisation de la caméra
  camera = new THREE.PerspectiveCamera(20, container.clientWidth / container.clientHeight, 0.1, 100)
  camera.position.set(0, -0.3, 1.0)

  // Initialisation des contrôles
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableZoom = false
  controls.minDistance = 3
  controls.minPolarAngle = 0.2
  controls.maxPolarAngle = 1.4
  controls.target.set(0, 1.4, 0)
  controls.update()

  // Création de la scène
  scene = new THREE.Scene()
  scene.add(new THREE.AmbientLight(0xffffff, 0.8)) // Augmentation de l'intensité de l'AmbientLight

  // Configuration des lumières principales sans ombres
  const keyLight = new THREE.DirectionalLight(0xffffff, 2) // Augmentation de l'intensité
  keyLight.position.set(1, 1, 2)
  scene.add(keyLight)

  // Ajout d'une HemisphereLight pour un éclairage global supplémentaire
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6) // Lumière du ciel et de l'ombre
  hemiLight.position.set(0, 20, 0)
  scene.add(hemiLight)

  // Ajout du modèle à la scène sans modifier les matériaux
  const avatar = gltf.scene
  scene.add(avatar)

  // Ajout du sol
  const groundGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64)
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 })
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
  groundMesh.castShadow = false
  groundMesh.receiveShadow = true
  groundMesh.position.y -= 0.05
  scene.add(groundMesh)

  // Configuration des animations
  mixer = new THREE.AnimationMixer(avatar)
  const clips = gltf.animations

  const waveClip = THREE.AnimationClip.findByName(clips, 'waving')
  const stumbleClip = THREE.AnimationClip.findByName(clips, 'stragger')

  if (waveClip) {
    waveAction = mixer.clipAction(waveClip)
    waveAction.play()
  }

  if (stumbleClip) {
    stumbleAction = mixer.clipAction(stumbleClip)
  }

  // Gestion des interactions avec les clics
  container.addEventListener('mousedown', () => {
    if (waveAction && stumbleAction) {
      stumbleAction.reset().play()
      waveAction.crossFadeTo(stumbleAction, 0.3, false)

      setTimeout(() => {
        waveAction.reset().play()
        stumbleAction.crossFadeTo(waveAction, 1, false)
      }, 4000)
    }
  })

  // Fonction d'animation optimisée
  function animate() {
    animationId = requestAnimationFrame(animate)
    const delta = clock.getDelta()

    mixer.update(delta)

    controls.update()
    renderer.render(scene, camera)
  }

  animate()
}

onMounted(async () => {
  try {
    const gltf = await loadModel()
    setupScene(gltf)
  } catch (error) {
    console.error('Erreur d\'initialisation :', error)
  }
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  const container = document.getElementById('avatar-container')
  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement)
    }
  }
})
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader div {
  width: 15px;
  height: 15px;
  margin: 5px;
  background-color: #008573;
  border-radius: 50%;
  animation: loader-animation 0.6s infinite alternate;
}

.loader div:nth-child(2) {
  animation-delay: 0.2s;
}

.loader div:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loader-animation {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.5);
    opacity: 0.5;
  }
}

#avatar-container {
  position: relative;
  touch-action: none; /* Important pour les mobiles */
  user-select: none;
}

#avatar-container canvas {
  width: 100% !important;
  height: 100% !important;
  outline: none;
  pointer-events: auto !important;
}

@media screen and (max-width: 640px) {
  #avatar-container {
    width: 343px;
    height: 300px;
  }
}

#avatar-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
