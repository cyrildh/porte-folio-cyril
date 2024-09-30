const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'  // Remplacez par le nom de votre dépôt GitHub
    : '/'
  })