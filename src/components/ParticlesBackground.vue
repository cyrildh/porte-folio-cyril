<template>
  <div
    ref="particleContainer"
    class="particle-container"
  />
</template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    name: 'ParticleBackground',
    mounted() {
      this.initThree();
    },
    methods: {
      initThree() {
        const container = this.$refs.particleContainer;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          container.clientWidth / container.clientHeight,
          1,
          1000
        );
        camera.position.z = 400;
  
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
  
        // Création des particules
        const particleCount = 2000;
        const particles = new THREE.BufferGeometry();
        const positions = [];
  
        for (let i = 0; i < particleCount; i++) {
          positions.push(
            (Math.random() * 2 - 1) * 500,
            (Math.random() * 2 - 1) * 500,
            (Math.random() * 2 - 1) * 500
          );
        }
  
        particles.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(positions, 3)
        );
  
        const particleMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 2,
        });
  
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
  
        // Animation
        const animate = () => {
          requestAnimationFrame(animate);
  
          particleSystem.rotation.y += 0.0005;
  
          renderer.render(scene, camera);
        };
  
        animate();
  
        // Gestion de la réactivité lors du redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        });
      },
    },
  };
  </script>
  
  <style>
  .particle-container {
    position: absolute;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: -1; /* Pour placer le canvas derrière le contenu */
  }
  </style>
  