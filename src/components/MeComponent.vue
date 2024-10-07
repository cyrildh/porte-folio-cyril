<template>
  <div class="h-screen flex items-center justify-center text-center bg-background2 relative pt-13">
    <!-- Contenu du portfolio -->
    <div class="relative z-10 px-4 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col items-center justify-center text-center lg:flex-col lg:justify-around lg:space-x-8">
          <div class="relative">
            <div
              id="avatar-container"
              class="overflow-hidden mx-auto"
            >
              <div
                id="avatar-loading"
                class="loader"
              >
                <div />
                <div />
                <div />
              </div>
            </div>
            <span class="absolute lg:top-20 lg:right-40 top-10 right-0 bg-text2 text-white text-sm sm:text-base md:text-lg font-semibold px-2 py-1 rounded-tl-lg rounded-br-lg">
              {{ labelText }}
            </span>
          </div>
          <div class="mt-4 sm:mt-6 lg:mt-10">
            <h1 class="text-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              {{ name }}
            </h1>
            <h1 class="text-text text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mt-2 sm:mt-3">
              {{ title }}
            </h1>
            <a
              :href="cvLink"
              download
              class="mt-4 sm:mt-6 inline-flex items-center px-6 py-2 sm:px-8 sm:py-2 bg-components text-white font-semibold text-base sm:text-lg rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-border focus:ring-opacity-50"
            >
              <font-awesome-icon
                :icon="['fas', 'download']"
                class="h-4 w-4 sm:h-5 sm:w-5 mr-2"
              />
              Télécharger mon CV
            </a>
            <div class="mt-4 sm:mt-6 flex justify-center space-x-4">
              <SocialIcon
                v-for="icon in socialIcons"
                :key="icon.name"
                :href="icon.href"
                :icon="icon.icon"
                :label="icon.label"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import SocialIcon from './SocialIcon.vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const name = 'Développeur'
const title = 'Full Stack'
const labelText = 'Cyril Dohin'
const cvLink = '/cv_cyril_dohin.pdf'

const socialIcons = [
  { name: 'Facebook', href: 'https://www.facebook.com/cyril.dohin?locale=fr_FR', icon: ['fab', 'facebook'], label: 'Facebook' },
  { name: 'GitHub', href: 'https://github.com/cyrildh', icon: ['fab', 'github'], label: 'GitHub' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/cyril-dohin/', icon: ['fab', 'linkedin'], label: 'LinkedIn' },
]

let renderer, scene, camera, controls, mixer
let waveAction, stumbleAction
let animationId

const clock = new THREE.Clock()

async function loadModel() {
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  loader.setDRACOLoader(dracoLoader)
  loader.setCrossOrigin('anonymous')

  loader.load(
    'avatar.glb',
    (gltf) => {
      setupScene(gltf)
      document.getElementById('avatar-loading').style.display = 'none'
    },
    undefined,
    (error) => {
      console.error('Erreur lors du chargement du modèle :', error)
    }
  )
}

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
  scene.add(new THREE.AmbientLight(0xffffff, 0.5)) // Lumière ambiante ajustée

  // Configuration des lumières principales sans ombres
  const keyLight = new THREE.DirectionalLight(0xffffff, 2)
  keyLight.position.set(1, 1, 2)
  scene.add(keyLight)

  // Ajout du modèle à la scène
  const avatar = gltf.scene
  avatar.traverse((child) => {
    if (child.isMesh) {
      // Utilisation de MeshBasicMaterial pour améliorer les performances
      child.material = new THREE.MeshBasicMaterial({ color: 0xffffff })
      child.castShadow = false
      child.receiveShadow = false
    }
  })
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

  // Fonction d'animation simplifiée
  function animate() {
    animationId = requestAnimationFrame(animate)
    const delta = clock.getDelta()

    mixer.update(delta)

    controls.update()
    renderer.render(scene, camera)
  }

  animate()
}

onMounted(() => {
  loadModel()
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
  width: 800px;
  height: 500px;
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
