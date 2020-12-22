const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  entry: {
    index: path.join(__dirname, '../example/index.js')
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, '../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../example/index.html'),
      chunks: ['index']
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true
  },
  mode: 'development'
})