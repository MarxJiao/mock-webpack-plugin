# MockWebpackPlugin
一个建立mock server的webpack插件
# 这个插件解决的问题
对于前后端开发的项目，大部分的情况是先约定好接口格式，前端使用本地mock数据进行开发，开发后使用后端接口联调。webpack-dev-server提供了proxy配置，我们可以在开发中将接口代理到本地服务。mock数据使用json文件能最方便的进行开发，然而在webpack-dev-server 1.6以后的版本并不支持将接口代理到json文件。webpack-dev-server的proxy使用的是http-proxy-middleware，这个[issue](https://github.com/chimurai/http-proxy-middleware/issues/63)说明了原因。

所以在开发过程中我们需要搭建服务器，来将接口指向json文件。本插件的功能就是起一个express服务来serve这些接口，并根据配置指向相应的json文件。

# 使用
## 安装
```
npm install --save-dev webpack mock-webpack-plugin
```
## 配置
新建配置文件，名字和路径可按照项目目录自行规划，比如在项目根目录新建mock目录，在mock目录下新建config.js文件
```javascript
const path = require('path');
const config = {
    '/f/d': {
        data: './json/a.json'
    }
}

for (let item in config) {
    if (config.hasOwnProperty(item)) config[item].path = path.resolve(__dirname, config[item].data);
}
module.exports = config;
```
上边的配置文件为参考，总之配置文件输出的内容为以下格式的对象，对象里的key为路径，对应的path为指向json文件的绝对路径
```javascript
{
    '/f/d': {
        path: '/users/username/pathtojson/a.json'
    }
}
```
这里的`./json/a.json`文件内容为
```json
{
    "errno": 0,
    "data": {
        "title": "hello world"
    }
}
```

在webpack.config.js中，配置proxy和mock-webpck-plugin
```javascript
const path = require('path');

const MockWebpackPlugin = require('mock-webpack-plugin');
const mockConfig = require('./mock/config.js');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },

  // 配置插件
  plugins: [
    // 插件的功能是根据配置文件，起一个指定端口的server，将接口请求指向json文件
    new MockWebpackPlugin({
        // mock数据的配置内容
        config: mockConfig,
        // 配置文件的端口
        port: 3000
    })
  ],

  // 配置代理，这里的代理为webpack自带功能，将/f/d的接口代理到本地3000端口
  devServer: {
    proxy: {
        '/f/d': 'http://localhost:3000'
    }
  }
};
```

# 参数
```javascript
new MockWebpackPlugin(options)
```
- options.config mock数据的配置信息
- options.port 代理服务器端口，默认为3000
