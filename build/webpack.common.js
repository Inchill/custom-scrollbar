const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: path.join(__dirname, '../src/index.js')
  },
  output: {
    filename: 'custom-scrollbar.js',
    path: path.join(__dirname, '../lib'),
    library: 'CustomScrollbar', // expose the constructor
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-modules-commonjs'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl(us)$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ]
}