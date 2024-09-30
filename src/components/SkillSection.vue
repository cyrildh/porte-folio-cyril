<template>
  <div class="mb-8">
    <h3 class="text-xl font-semibold leading-7 text-text2 lg:text-left text-center">
      {{ props.title }}
    </h3>
    <div class="mt-4 flex flex-wrap lg:justify-start justify-center gap-8">
      <div
        v-for="skill in props.skills"
        :key="skill.name"
        class="flex flex-col items-center text-left"
      >
        <template v-if="skill.isPng">
          <img
            :src="skill.icon"
            class="w-14 pb-2"
            :alt="skill.name"
          >
        </template>
        <template v-else>
          <font-awesome-icon
            :icon="skill.icon"
            class="text-5xl pb-2"
            aria-hidden="true"
          />
        </template>
        <dt class="text-base leading-7 text-text">
          {{ skill.name }}
        </dt>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  // Define props without destructuring
  const props = defineProps({
    title: String,
    skills: Array
  })
  </script>
  