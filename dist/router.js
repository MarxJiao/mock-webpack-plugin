"use strict";

/**
 * @file router
 * @author Marx
 */
var _require = require('express'),
    Router = _require.Router;

var _require2 = require('mockjs'),
    mock = _require2.mock;

function createRouter(config) {
  var router = new Router();

  var _loop = function _loop(mockRoute) {
    if (config.hasOwnProperty(mockRoute)) {
      router.all(mockRoute, function (req, res) {
        var mockData = {};

        if (config[mockRoute].data) {
          mockData = config[mockRoute].data;
        } else if (config[mockRoute].path) {
          // delete require cache, so that we can apply mock files' changes on runtime
          delete require.cache[config[mockRoute].path];
          mockData = require(config[mockRoute].path);
        }

        res.send(mock(mockData));
      });
    }
  };

  for (var mockRoute in config) {
    _loop(mockRoute);
  }

  return router;
}

module.exports = createRouter;