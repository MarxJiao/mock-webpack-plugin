"use strict";

/**
 * @file An express mock server
 * @author Marx
 */
var express = require('express');

var createRouter = require('./router');

module.exports = function (_ref) {
  var config = _ref.config,
      _ref$port = _ref.port,
      port = _ref$port === void 0 ? 3000 : _ref$port;

  if (config) {
    var app = express();
    app.use(createRouter(config));
    var server = app.listen(port, function () {
      var port = server.address().port;
      console.log('Mock server listening at http://localhost:%s', port);
    });
  } else {
    console.warn('No Config File!');
  }
};