const path = require('path');

const MockWebpackPlugin = require('../dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./mock/config.js');

module.exports = {
    mode: 'development',
    watch: true,
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    plugins: [
        new MockWebpackPlugin({
            config,
            port: 5000
        }),
        new HtmlWebpackPlugin({
            title: 'Development'
        })
    ],
    devServer: {
        proxy: {
            '/api': 'http://localhost:5000'
        },
        port: 8000
    }
};
