const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SOCKET_URL = process.env.NODE_ENV === 'production'
  ? 'https://legend-of-ether.herokuapp.com/'
  : 'http://localhost:3000'

const environmentPlugin = new webpack.DefinePlugin({
  "process.env": {
    SOCKET_URL: JSON.stringify(SOCKET_URL)
  }
})

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/index.html'),
  filename: './index.html'
})

console.log('Building with WebPack', process.env.NODE_ENV)

module.exports = {
  entry: path.join(__dirname, 'src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    environmentPlugin,
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 3001
  }
}