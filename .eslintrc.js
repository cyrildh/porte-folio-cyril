module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended', // Assurez-vous d'utiliser vue3-recommended
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    globals: {
      'defineProps': 'readonly',
      'defineEmits': 'readonly',
      'defineExpose': 'readonly',
      'defineOptions': 'readonly',
      'withDefaults': 'readonly',
      'vue/setup-compiler-macros': true,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  };
  