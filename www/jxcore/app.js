/*var server = require('jxm'),
    alert = Mobile('alert');

var name = 'Tic tac toe',
    path = '/tictactoe',
    key = 'NUBISA-STANDARD-KEY-CHANGE-THIS',
    port = 8000;

function startServer() {
    server.setApplication(name, path, key);
    server.addJSMethod('serverMethod', function (env, params) {
       server.sendCallBack(env, params + ' World!');
    });
    server.start();
}

function createClient() {
    var client = server.createClient(null, path, key, 'localhost', port);
    client.on('connect', function(client) {
        alert.call('Client connected');
        client.Call('serverMethod', 'Hello', function(param, err) {
            if (err) {
                alert.call('Error while calling server\'s method. Code: ' + err);
            } else {
                alert.call('Received callback from the server: ' + param);
            }
            client.Close();
        });
    });
     
    client.on('close', function(client) {
        alert.call('Client disconnected');
    });
     
    client.on('error', function(client, err) {
        alert.call('Error: ' + err);
    });
     
    client.Connect();
}*/

function getLocalIPs(justNumbers) {
    var os = require('os');
    var net = os.networkInterfaces();
    var ips = [];

    for (var ifc in net) {
        var addrs = net[ifc];
        for (var a in addrs) {
            if (addrs[a].family == 'IPv4' && !addrs[a].internal) {
                var addr = addrs[a].address;
                if (addr.indexOf('192.168.') == 0 || addr.indexOf('10.0.') == 0) {
                    ips.push(addr);
                }
            }
        }
    }

    if (ips.length == 0) {
        if (net.hasOwnProperty('en0') || net.hasOwnProperty('en1')) {
            var addrs = net['en0'] || net['en1'];
            for (var a in addrs) {
                if (addrs[a].family == 'IPv4' && !addrs[a].internal) {
                    var addr = addrs[a].address;
                    ips.push(addr);
                }
            }
        }

        if (ips.length == 0) {
            for (var ifc in net) {
                var addrs = net[ifc];
                for (var a in addrs) {
                    if (addrs[a].family == 'IPv4' && !addrs[a].internal) {
                        var addr = addrs[a].address;
                        ips.push(addr);
                    }
                }
            }
        }
    }

    return justNumbers ? ips : ips.map(function (ip, i) {
        return 'http://' + ips[i]// + ':' + server.getConfig('httpServerPort');
    });
};

/*Mobile('startServer').registerAsync(startServer);
Mobile('createClient').registerAsync(createClient);*/
try {
    Mobile('alert').call(JSON.stringify(getLocalIPs()));
    Mobile('getLocalIPs').registerSync(getLocalIPs);
} catch (err) {
    Mobile('alert').call(err.message);
}