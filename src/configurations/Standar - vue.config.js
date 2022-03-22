const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
var webpack = require('webpack')

module.exports = {  
  "transpileDependencies": [
    "vuetify"
  ],
  "publicPath": "./",
  configureWebpack: {
    plugins:[
      new webpack.DefinePlugin({
        'process.env.APP_VERSION': JSON.stringify(version)
      })
    ],
    output: {
      filename: '[name].[hash].js',
      // clean: true
    },  
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
  },  
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Citas vacunación";
        return args;
      })
  }
}