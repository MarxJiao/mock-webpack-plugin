/**
 * @file A middleware that handles the requset
 * @author Marx
 */

const path = require('path');
const fs = require('fs');

module.exports = async function(req, res, next) {
    const config = req.config;
    if (config[req.path]) {
        const data = await fsRead(config[req.path].path)
        res.send(JSON.parse(data));
    }else {
        res.send({errno: -1, msg: 'No such proxy: ' + req.path});
    }
    next();
}

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
                    console.log('Open "' + err.path +'" fail!')
                }
                reject(err);
            }
            resolve(data.toString())
        })
    })
}