/**
 * @file plugin entry point
 * @author Marx
 */

const server = require('./server.js');

/**
 * @class MockWebpackPlugin
 *
 * @param {Object} param data that plugin needs
 */
function MockWebpackPlugin({ config, port = 3000 }) {
    this.config = config;
    this.port = port;
}

MockWebpackPlugin.prototype.apply = function (compiler) {
    server({ config: this.config, port: this.port });
    compiler.plugin("emit", (compilation, callback) => {
        callback();
    });
};

module.exports = MockWebpackPlugin;