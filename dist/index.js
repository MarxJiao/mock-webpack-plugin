"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @file MockWebpackPlugin
 * @author Marx
 */
var server = require('./server.js');

var MockWebpackPlugin = /*#__PURE__*/function () {
  function MockWebpackPlugin(_ref) {
    var config = _ref.config,
        _ref$port = _ref.port,
        port = _ref$port === void 0 ? 3000 : _ref$port;

    _classCallCheck(this, MockWebpackPlugin);

    this.config = config;
    this.port = port;
  }

  _createClass(MockWebpackPlugin, [{
    key: "apply",
    value: function apply() {
      server({
        config: this.config,
        port: this.port
      });
    }
  }]);

  return MockWebpackPlugin;
}();

module.exports = MockWebpackPlugin;