# MockWebpackPlugin

![Node.js CI](https://github.com/MarxJiao/mock-webpack-plugin/workflows/Node.js%20CI/badge.svg?event=push)

一个建立mock server的webpack插件

# 这个插件解决的问题

对于前后端开发的项目，大部分的情况是先约定好接口格式，前端使用本地 mock 数据进行开发，开发后使用后端接口联调。webpack-dev-server 提供了 proxy 配置，我们可以在开发中将接口代理到本地服务。mock 数据使用 json 文件能最方便的进行开发，然而在 webpack-dev-server@1.6 以后的版本并不支持将接口代理到 json 文件。webpack-dev-server 的 proxy 使用的是 http-proxy-middleware，这个 [issue](https://github.com/chimurai/http-proxy-middleware/issues/63) 说明了原因。

所以在开发过程中我们需要搭建服务器，来将接口指向 json 文件。本插件的功能就是起一个 express 服务来 serve 这些接口，并根据配置指向相应的 mock 数据配置。

# 使用

## 安装

```
npm install --save-dev webpack mock-webpack-plugin
```

如果你用的是 webpack@2 或者 webpack@3 你可以使用本插件的 @2 版本

```
npm install --save-dev webpack mock-webpack-plugin@2
```

## 配置

先看 webpack config

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

这里是 mockConfig 的内容

```javascript

const path = require('path');

const config = {
    '/api/json/data': {
        data: {
            result: 'mocked'
        }
    },
    '/api/json/path': {
        // 如果使用路径的话，需要使用绝对路径，避免在传参过程中造成路径不匹配
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

`options.port` mock server 的端口，不能和 webpack dev server 相同。因为 mock 数据单独起了一个服务器。

`options.config` mock 数据的配置。key 是路径，就是对应 express 的路由。值是 mock 数据，可以用 `data` 返回数据，也可以通过 `path` 指定 mock 文件位置。mock 文件为 json 文件。

## Demo

可以参看 [Demo](./demo)。
