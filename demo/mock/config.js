const path = require('path');
const config = {
    '/f/d': {
        method: 'post',
        data: './json/a.json',
        target: 'http://localhost:3000'
    }
}

for (let item in config) {
    if (config.hasOwnProperty(item)) config[item].path = path.resolve(__dirname, config[item].data);
}
module.exports = config;