# MockWebpackPlugin

![Node.js CI](https://github.com/MarxJiao/mock-webpack-plugin/workflows/Node.js%20CI/badge.svg?event=push)

[中文readme](./readme-zh.md)

A webpack plugin that starts a json mock server

# What problem does this plugin solve

For the front and back of the development of the project, most of the situation is the first agreed interface format, front-end use of local mock data to develop. Webpack-dev-server provides proxy configuration, we can be in the development of the interface agent to the local service. Mock data using the json file can be the most convenient development, but in the webpack-dev-server 1.6 after the version does not support the interface proxy to json file. The webpack-dev-server proxy uses http-proxy-middleware, which [issue](https://github.com/chimurai/http-proxy-middleware/issues/63) explains why.

So in the development process we need to build the server, to point to the interface JSON file. The function of the plug-in is to serve a courier service to these interfaces, and according to the configuration point to the corresponding JSON file.

# Use

## Install

```
npm install --save-dev webpack mock-webpack-plugin
```

if you are using webpack@2 or webpack@3, you can install the `mock-webpack-plugin@2`

```
npm install --save-dev webpack mock-webpack-plugin@2
```


## Config

webpack config

```javascript
{
    // webpack plugins config
    plugins: [
        new MockWebpackPlugin({
            config: mockConfig,
            port: 5000
        })
    ],
    devServer: {
        // As MockWebpackPlugin only starts a mock server,
        // you need to config the devServer.proxy
        // to make your app access the mock data through the same origin
        proxy: {
            'api': 'http://localhost:3000'
        }
    }
}
```

mockConfig

```javascript

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
```

### Options

`options.port` port for mock server.Can not be the same as webpack dev server's port.Because the plugin start a new server besides webpack dev server.

`options.config` is a object of mock data config. The key is the route of your api. The data can be offered by 2 ways. Inline mock data and a path to the data. You can use json data and [Mock.js template](http://mockjs.com/) to provide your mock data.

## Demo

You can find a demo [here](./demo).
