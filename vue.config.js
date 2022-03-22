
module.exports = {  
  transpileDependencies: [ "vuetify"],
  publicPath: "./",
  
  configureWebpack: {
    output: {
      filename: '[name].[hash].js', //Hash in the fileName
    },  
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      },
    },
  },  
}