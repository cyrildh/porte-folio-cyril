<template>
  <div>
    <component
      :is="iconComponent"
      v-bind="iconProps"
      :class="computedClass"
      :style="computedStyle"
      aria-hidden="true"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'IconRenderer',
  components: {
    FontAwesomeIcon,
  },
  props: {
    icon: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iconComponent() {
      return this.icon.type === 'font-awesome' ? 'FontAwesomeIcon' : 'img';
    },
    iconProps() {
      if (this.icon.type === 'font-awesome') {
        return {
          icon: [this.icon.prefix, this.icon.name],
        };
      } else if (this.icon.type === 'image') {
        return {
          src: this.icon.src,
          alt: this.icon.name,
        };
      }
      return {};
    },
    computedStyle() {
      if (this.icon.color) {
        if (this.icon.type === 'font-awesome') {
          return { color: this.icon.color };
        } else if (this.icon.type === 'image') {
          return { filter: this.generateSVGFilter(this.icon.color) };
        }
      }
      return {};
    },
    computedClass() {
      return 'h-8 w-8';
    },
  },
  methods: {
    generateSVGFilter(color) {
      // Convertir la couleur hexadécimale en valeurs RGB
      const rgb = this.hexToRgb(color);
      if (rgb) {
        const { r, g, b } = rgb;
        // Créer une chaîne de filtres CSS pour coloriser l'image
        return `invert(1) sepia(1) saturate(5) hue-rotate(${this.calculateHueRotate(
          r,
          g,
          b
        )}deg)`;
      }
      return '';
    },
    hexToRgb(hex) {
      let normalizedHex = hex.replace('#', '');
      if (normalizedHex.length === 3) {
        normalizedHex =
          normalizedHex[0] +
          normalizedHex[0] +
          normalizedHex[1] +
          normalizedHex[1] +
          normalizedHex[2] +
          normalizedHex[2];
      }
      const bigint = parseInt(normalizedHex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    },
    calculateHueRotate(r, g, b) {
      // Cette fonction simplifiée calcule une valeur de hue-rotate approximative
      const avg = (r + g + b) / 3;
      return (avg / 255) * 360;
    },
  },
};
</script>

<style scoped>
</style>
