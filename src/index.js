/**
 * @file plugin entry point
 * @author Marx
 */

const cp = require('child_process');
const path = require('path');

/**
 * @class MockWebpackPlugin
 *
 * @param {Object} param data that plugin needs
 */
function MockWebpackPlugin({config, port = 3000}) {
    this.configPath = config;
    this.port = port;
}

MockWebpackPlugin.prototype.apply = function (compiler) {
    const serverPath = path.resolve(__dirname, './app.js');
    const server = cp.spawn('node', [serverPath, this.configPath, this.port]);
    server.stdout.on('data', data => {
        console.log(data.toString());
    })
    server.on('disconnect', (data) => {
        console.log('disconnect');
    })
    server.on('error', err => {
        console.log(err);
    })
    server.on('exit', (code, signal) => {
        console.log('Mock server exit', code)
    })
    compiler.plugin("emit", (compilation, callback) => {
        callback();
    });
}

module.exports = MockWebpackPlugin;