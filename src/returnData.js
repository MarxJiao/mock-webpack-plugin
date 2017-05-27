/**
 * @file A middleware that handles the requset
 * @author Marx
 */

const path = require('path');
const fs = require('fs');

module.exports = async function(req, res, next) {
    const urljson = readConfig(process.argv[2])
    if(urljson[req.path]) {
        const data = await fsRead(urljson[req.path].path)
        res.send(JSON.parse(data));
    }else {
        res.send({errno: -1, msg: 'No such config file'});
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
function fsRead(fifilePathle) {
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