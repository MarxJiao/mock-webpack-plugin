const path = require('path');

const MockWebpackPlugin = require('../dist/index.js');

const mockConfig = require('./mock/config.js');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  plugins: [
    new MockWebpackPlugin({
        config: mockConfig,
        port: 5000
    })
  ]
};