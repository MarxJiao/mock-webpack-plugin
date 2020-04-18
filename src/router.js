/**
 * @file router
 * @author Marx
 */

const {Router} = require('express');
const {mock} = require('mockjs');

function createRouter(config) {
    const router = new Router();
    for (let mockRoute in config) {
        if (config.hasOwnProperty(mockRoute)) {
            router.all(mockRoute, function (req, res) {
                let mockData = {};
                if (config[mockRoute].data) {
                    mockData = config[mockRoute].data;
                }
                else if (config[mockRoute].path) {

                    // delete require cache, so that we can apply mock files' changes on runtime
                    delete require.cache[config[mockRoute].path];
                    mockData = require(config[mockRoute].path);
                }
                res.send(mock(mockData));
            });
        }
    }
    return router;
}

module.exports = createRouter;
