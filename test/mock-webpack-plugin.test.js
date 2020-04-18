/**
 * @file test mock-webpack-plugin
 * @author Marx
 */

const axios = require('axios');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

let compiler;

beforeAll(done => {
    compiler = webpack(webpackConfig, err => {
        if (err) {
            throw err;
        }
        done();
    });
});

afterAll(done => {
    compiler && compiler.close();
    done();
});


test('json data', done => {
    axios.get('http://localhost:5000/api/json/data').then(res => {
        expect(res.data.result).toBe('mocked');
        done();
    });
});

test('json path', done => {
    axios.get('http://localhost:5000/api/json/path').then(res => {
        expect(res.data.result).toBe('mocked');
        done();
    });
});

test('Mock.js data', done => {
    axios.get('http://localhost:5000/api/mockjs/data').then(res => {
        expect(res.data.result).toBe('***');
        done();
    });
});

test('Mock.js path', done => {
    axios.get('http://localhost:5000/api/mockjs/path').then(res => {
        expect(res.data.result).toBe('***');
        done();
    });
});