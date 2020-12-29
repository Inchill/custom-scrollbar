const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  entry: {
    index: path.join(__dirname, '../src/index.js')
  },
  output: {
    filename: 'custom-scrollbar.js',
    path: path.join(__dirname, '../lib'),
    library: 'CustomScrollbar', // expose the constructor
    libraryTarget: 'window'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        exclude: /node_modules/
      })
    ]
  },
  mode: 'production'
})