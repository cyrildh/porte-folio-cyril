// vue.config.js
const webpack = require('webpack');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  // Autres configurations si nécessaire

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },
  devServer: {
    proxy: {
      '/send-email': {
          target: 'http://localhost:3000',
          changeOrigin: true,
      }
    },
  },
};
