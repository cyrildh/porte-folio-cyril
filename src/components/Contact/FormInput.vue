<template>
    <div class="space-y-2">
      <label 
        :for="id" 
        class="block text-sm font-medium text-text-primary dark:text-gray-200"
      >
        {{ label }}
      </label>
      
      <div class="relative">
        <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <i :class="`fa-${icon} fas text-gray-400 dark:text-gray-500`" />
        </div>
        
        <input
          :id="id"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :class="[
            'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all',
            icon ? 'pl-4' : 'pl-4',
            error 
              ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-500/30' 
              : 'border-gray-300 focus:border-primary focus:ring-primary/20 dark:border-gray-600 dark:focus:border-primary-light'
          ]"
          @input="$emit('update:modelValue', $event.target.value)"
        >
      </div>
  
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
    modelValue: [String, Number],
    error: String,
    icon: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    }
  })
  
  defineEmits(['update:modelValue'])
  </script>