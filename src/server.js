/**
 * @file An express mock server
 * @author Marx
 */

const express = require('express');
const createRouter = require('./router');

module.exports = function ({config, port = 3000}) {
    if (config) {
        const app = express();
        app.use(createRouter(config));

        const server = app.listen(port, function () {
            const port = server.address().port;
            console.log('Mock server listening at http://localhost:%s', port);
        });
    }
    else {
        console.warn('No Config File!');
    }
};
