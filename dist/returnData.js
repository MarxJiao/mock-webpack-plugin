function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @file A middleware that handles the requset
 * @author Marx
 */

const path = require('path');
const fs = require('fs');

module.exports = (() => {
    var _ref = _asyncToGenerator(function* (req, res, next) {
        const config = req.config;
        if (config[req.path]) {
            const data = yield fsRead(config[req.path].path);
            res.send(JSON.parse(data));
        } else {
            res.send({ errno: -1, msg: 'No such proxy: ' + req.path });
        }
        next();
    });

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
})();

/**
 * Get config content
 *
 * @param {string} configPath config path
 * @return {Object} config content
 */
function readConfig(configPath) {
    const config = require(configPath);
    return config;
}

/**
 * Read file
 *
 * @param {string} filePath file path
 * @return {Object} Promise
 */
function fsRead(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.syscall === 'open') {
                    console.log('Open "' + err.path + '" fail!');
                }
                reject(err);
            }
            resolve(data.toString());
        });
    });
}