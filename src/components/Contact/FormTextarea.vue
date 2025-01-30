<template>
    <div class="space-y-2">
      <label 
        :for="id" 
        class="block text-sm font-medium text-text-primary dark:text-gray-200"
      >
        {{ label }}
      </label>
  
      <textarea
        :id="id"
        :value="modelValue"
        :rows="rows"
        :placeholder="placeholder"
        :class="[
          'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all',
          error 
            ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-500/30' 
            : 'border-gray-300 focus:border-primary focus:ring-primary/20 dark:border-gray-600 dark:focus:border-primary-light'
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
      />
  
      <transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
          {{ error }}
        </p>
      </transition>
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    id: String,
    modelValue: String,
    error: String,
    placeholder: String,
    rows: {
      type: [String, Number],
      default: 4
    }
  })
  
  defineEmits(['update:modelValue'])
  </script>