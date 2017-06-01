const path = require('path');

const MockWebpackPlugin = require('mock-webpack-plugin');
const proxy = require('./mock/config.js');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  plugins: [
    new MockWebpackPlugin({
        config: proxy,
        port: 3000
    })
  ],
  devServer: {
    proxy
  }
};