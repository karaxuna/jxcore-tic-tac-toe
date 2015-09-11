var express = require('express'),
    app = express(),
    config = require('./config');

app.use(express.static(config.publicPath, {
    index: './index.html'
}));

['jxcore', 'cordova'].forEach(function (fname) {
    app.get('/' + fname + '.js', function (req, res) {
        res.send('window.' + fname + '="none";');
    });
});

var server = app.listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
