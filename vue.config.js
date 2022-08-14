const webpack = require('webpack')
// const path = require("path");

// module.exports = {
//   outputDir: path.resolve(__dirname, "../backend/templates/SPA"),
//   assetsDir: "../../static/SPA"
// }
module.exports = {
  configureWebpack: {},
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/mtnnfmap/'
      : '/mtn/mtnf-map/wp-content/plugins/mtnnf-map/templates/mtnmap/dist/'
}
