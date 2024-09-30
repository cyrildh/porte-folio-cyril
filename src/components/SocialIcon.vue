<template>
  <a
    :href="href"
    class="w-12 h-12 flex items-center justify-center rounded-full p-3 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:hover:bg-secondary-900"
    :aria-label="label"
  >
    <font-awesome-icon
      :icon="icon"
      class="text-3xl"
      aria-hidden="true"
    />
  </a>
</template>
  <script setup>
  defineProps({
    href: {
      type: String,
      required: true,
    },
    icon: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  })
  </script>
  