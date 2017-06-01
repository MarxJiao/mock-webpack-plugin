# MockWebpackPlugin
[中文readme](./readme-zh.md)

A webpack plugin that starts a json mock server

# What is the problem this plugin solved
For the front and back of the development of the project, most of the situation is the first agreed interface format, front-end use of local mock data to develop. Webpack-dev-server provides proxy configuration, we can be in the development of the interface agent to the local service. Mock data using the json file can be the most convenient development, but in the webpack-dev-server 1.6 after the version does not support the interface proxy to json file. The webpack-dev-server proxy uses http-proxy-middleware, which [issue](https://github.com/chimurai/http-proxy-middleware/issues/63) explains why.

So in the development process we need to build the server, to point to the interface JSON file. The function of the plug-in is to serve a courier service to these interfaces, and according to the configuration point to the corresponding JSON file.

# USE
## Install
```
npm install --save-dev webpack mock-webpack-plugin
```

## Config
New configuration file, name and path can be planned according to the project directory. Here I create a mock directory at the project root directory , in the mock directory I create a new config.js file.
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
The config above is for reference only。You can write the config the way you like.The only thing to remember is the config file exports a javascript object like that:
```javascript
{
    '/f/d': {
        path: '/users/username/pathtojson/a.json'
    }
}
```
> Notice: The 'path' is absolute path

Here is a test json file `./json/a.json`
```json
{
    "errno": 0,
    "data": {
        "title": "hello world"
    }
}
```
config proxy and mock-webpck-plugin in `webpack.config.js`

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

  plugins: [
    new MockWebpackPlugin({

        // mock config content
        config: mockConfig,

        // the prot of the mock server
        port: 3000
    })
  ],

  devServer: {
    // proxy to the mock server
    proxy: {
        '/f/d': 'http://localhost:3000'
    }
  }
};
```

# OPTIONS
```javascript
new MockWebpackPlugin(options)
```
- `options.config` : mock config content
- `options.port` : the prot of the mock server