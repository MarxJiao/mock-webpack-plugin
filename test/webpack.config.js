const path = require('path');

const MockWebpackPlugin = require('../src/index.js');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  plugins: [
    new MockWebpackPlugin({
        config: path.resolve(__dirname, './mock/config.js'),
        port: 5000
    })
  ]
};