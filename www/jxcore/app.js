var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    config = require('./config')(__dirname),
    environment = app.get('env');

// start server
var port = process.env.PORT || 80;
http.listen(port);

// serve static files
var staticFolderPath = environment === 'development' ? config.publicPath : config.buildPath;
app.use(express.static(path.resolve(__dirname, staticFolderPath), {
    index: './index.html'
}));

// website version
['cordova', 'jxcore'].forEach(function (fname) {
    app.get('/' + fname + '.js', function (req, res) {
        res.send('window.' + fname + '="none";');
    });
});