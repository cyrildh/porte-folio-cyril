module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' // Remplacez par le nom de votre dépôt
    : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  // Autres configurations si nécessaire
}
