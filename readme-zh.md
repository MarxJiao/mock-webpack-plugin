# MockWebpackPlugin
一个建立mock server的webpack插件
# 这个插件解决的问题
对于前后端开发的项目，大部分的情况是先约定好接口格式，前端使用本地mock数据进行开发，开发后使用后端接口联调。webpack-dev-server提供了proxy配置，我们可以在开发中将接口代理到本地服务。mock数据使用json文件能最方便的进行开发，然而在webpack-dev-server 1.6以后的版本并不支持将接口代理到json文件。webpack-dev-server的proxy使用的是http-proxy-middleware，这个[issue](https://github.com/chimurai/http-proxy-middleware/issues/63)说明了原因。

所以在开发过程中我们需要搭建服务器，来将接口指向json文件。本插件的功能就是起一个express服务来serve这些接口，并根据配置指向相应的json文件。