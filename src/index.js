/**
 * @file MockWebpackPlugin
 * @author Marx
 */

const server = require('./server.js');

class MockWebpackPlugin {
    constructor({config, port = 3000}) {
        this.config = config;
        this.port = port;
    }
    apply() {
        server({config: this.config, port: this.port});
    }
}

module.exports = MockWebpackPlugin;
