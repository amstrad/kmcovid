module.exports = {
  pwa: {
    name: 'KM Covid',
    themeColor: '#3f51b5',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      // ...other Workbox options...
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: { https: true }
}