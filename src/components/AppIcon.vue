<template>
  <FontAwesomeIcon
    v-if="icon.type === 'font-awesome'"
    :icon="[icon.prefix, icon.name]"
    v-bind="$attrs"
  />
  <img
    v-else-if="icon.type === 'image'"
    :src="icon.src"
    v-bind="$attrs"
    alt=""
  >
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps({
  icon: {
    type: Object,
    required: true,
  },
})

defineOptions({
  name: 'AppIcon',
})
</script>
