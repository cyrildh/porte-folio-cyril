<template>
  <head>
    <link
      rel="preload"
      href="/avatar.glb"
      as="fetch"
      crossorigin="anonymous"
    >
  </head>
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
import SocialIcon from './SocialIcon.vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const name = 'Développeur'
const title = 'full stack'
const labelText = 'Cyril Dohin'
const cvLink = '/cv_cyril_dohin.pdf'

const socialIcons = [
  { name: 'Facebook', href: 'https://www.facebook.com/cyril.dohin?locale=fr_FR', icon: ['fab', 'facebook'], label: 'Facebook' },
  { name: 'GitHub', href: 'https://github.com/cyrildh', icon: ['fab', 'github'], label: 'GitHub' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/cyril-dohin/', icon: ['fab', 'linkedin'], label: 'LinkedIn' },
]

window.onload = () => loadModel()

let leftEye, rightEye, mixer, waveAction, stumbleAction

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
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const container = document.getElementById('avatar-container')
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(20, container.clientWidth / container.clientHeight)
  camera.position.set(0, -0.3, 1.0)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableZoom = false
  controls.minDistance = 3
  controls.minPolarAngle = 0.2
  controls.maxPolarAngle = 1.4
  controls.target.set(0, 1.4, 0)
  controls.update()

  const scene = new THREE.Scene()
  scene.add(new THREE.AmbientLight())

  const spotlight = new THREE.SpotLight(0xffffff, 20, 8, 1)
  spotlight.penumbra = 0.5
  spotlight.position.set(0, 4, 2)
  spotlight.castShadow = true
  scene.add(spotlight)

  const keyLight = new THREE.DirectionalLight(0xffffff, 2)
  keyLight.position.set(1, 1, 2)
  keyLight.lookAt(new THREE.Vector3())
  scene.add(keyLight)

  const avatar = gltf.scene

  scene.add(avatar)

  const groundGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64)
  const groundMaterial = new THREE.MeshStandardMaterial()
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
  groundMesh.castShadow = false
  groundMesh.receiveShadow = true
  groundMesh.position.y -= 0.05
  scene.add(groundMesh)

  // Raycaster pour obtenir la position de la souris
  const mouse = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()

  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
  })

  // Mixer pour les animations
  mixer = new THREE.AnimationMixer(avatar)
  const clips = gltf.animations

  // Récupération des animations par nom
  const waveClip = THREE.AnimationClip.findByName(clips, 'waving')
  const stumbleClip = THREE.AnimationClip.findByName(clips, 'stragger')

  waveAction = mixer.clipAction(waveClip)
  stumbleAction = mixer.clipAction(stumbleClip)

  waveAction.play()

  const clock = new THREE.Clock()

  // Ajouter l'interaction avec les clics pour lancer stumbleAction
  container.addEventListener('mousedown', () => {
    if (waveAction && stumbleAction) {
      stumbleAction.reset().play()
      waveAction.crossFadeTo(stumbleAction, 0.3)

      setTimeout(() => {
        waveAction.reset().play()
        stumbleAction.crossFadeTo(waveAction, 1)
      }, 4000)
    }
  })

  function animate() {
    requestAnimationFrame(animate)
    mixer.update(clock.getDelta())

    // Obtenir la position à regarder pour les yeux
    const lookAtPos = new THREE.Vector3()
    raycaster.ray.at(2, lookAtPos) // Position 3D à 2 unités de distance

    // Tourner les yeux vers cette position
    if (leftEye && rightEye) {
      leftEye.lookAt(lookAtPos)
      rightEye.lookAt(lookAtPos)
    }

    renderer.render(scene, camera)
  }

  animate()
}
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
