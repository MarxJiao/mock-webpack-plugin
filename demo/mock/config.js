/**
 * @file mock-webpack-plugin config
 * @author Marx
 */

const path = require('path');

const config = {
    '/api/json/data': {
        data: {
            result: 'mocked'
        }
    },
    '/api/json/path': {
        path: path.join(__dirname, './json/result.json')
    },
    '/api/mockjs/data': {
        data: {
            'result|3': '*'
        }
    },
    '/api/mockjs/path': {
        path: path.join(__dirname, './json/mockjs.json')
    }
};

module.exports = config;
