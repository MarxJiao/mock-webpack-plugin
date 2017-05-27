/**
 * @file An express mock server
 * @author Marx
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var returnData = require('./returnData.js');

if (process.argv[2]) {
    const port = +process.argv[3] || 3000;
    var app = express();
    app.use(returnData);

    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Mock server listening at http://%s:%s', host, port);
    });
}
else {
    console.log('No Config File!')
}

