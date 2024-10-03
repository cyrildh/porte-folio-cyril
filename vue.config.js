// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' // pour AWS, généralement la racine
    : '/',
  // autres configurations
}
