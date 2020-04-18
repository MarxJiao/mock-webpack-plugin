/**
 * @file webpack config
 * @author jiaojian04
 */

const path = require('path');

const MockWebpackPlugin = require('../dist/index.js');

const mockConfig = require('./mock/config.js');

module.exports = {
    mode: 'development',
    watch: true,
    entry: './demo.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'demo.js'
    },
    plugins: [
        new MockWebpackPlugin({
            config: mockConfig,
            port: 5000
        })
    ]
};
