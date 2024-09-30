<template>
  <section>
    <h3 class="text-2xl font-bold text-text2 mb-4">
      {{ title }}
    </h3>
    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <li
        v-for="item in items"
        :key="item.name"
        class="flex items-center"
      >
        <IconRenderer
          :icon="item.icon"
          class="text-3xl text-text2 mr-4"
        />
        <span class="text-lg font-semibold text-text">{{ item.name }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import IconRenderer from './IconRenderer.vue';

export default {
  name: 'CategorySection',
  components: {
    IconRenderer,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
