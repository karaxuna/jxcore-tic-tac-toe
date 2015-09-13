var server = require('jxm'),
    path = require('path'),
    alert = Mobile('alert');

var name = 'TicTacToe',
    url = '/',
    key = 'NUBISA-STANDARD-KEY-CHANGE-THIS',
    port = 8000,
    gameConfig = {
        dimensions: 3,
        winningScore: 3,
        turn: 'x',
        me: null
    },
    game,
    peer;

server.setApplication(name, url, key);
server.linkResourcesFromPath('/', path.resolve(__dirname, './build'));

server.on('start', function() {
    alert.call('Server started');
});

server.addJSMethod('connectToServer', function(env, rpd) {
    alert.call('Server got connection request');
    try {
    if (peer) {
        alert.call('No peer');
        server.sendCallBack(env, false);
    } else {
        alert.call('Connecting to client. url: ' + rpd.url + '. ip: ' + rpd.ip + '. port: ' + rpd.port);
        var client = server.createClient(null, rpd.url, key, rpd.ip, rpd.port);
        client.on('connect', function(client) {
            alert.call('Connected to client');
            game = {
                dimensions: gameConfig.dimensions,
                winningScore: gameConfig.winningScore,
                turn: gameConfig.turn,
                me: gameConfig.turn
            };

            server.sendCallBack(env, {
                dimensions: game.dimensions,
                winningScore: game.winningScore,
                turn: game.turn,
                me: game.me === 'x' ? 'o' : 'x'
            });

            peer = client;
            Mobile('start').call();
        });
        
        client.on('close', function(client) {
            alert.call('Peer disconnected');
            peer = null;
            game = null;
        });

        client.on('error', function(client, err) {
            alert.call('Error: ' + err);
        });

        client.Connect();
    }
    } catch(err) { alert(err.message); };
});

server.addJSMethod('fill', function(env, data) {
    Mobile('filled').call(data);
    server.sendCallBack(env);
});

Mobile('finish').registerSync(function(data) {
    peer.Close();
    peer = null;
    game = null;
    alert.call('Game over. Winner is ' + data.winner);
});

Mobile('fill').registerAsync(function(data, callback) {
    alert.call('Fill called');
    client.Call('fill', data, callback);
});

Mobile('setGameConfig').registerSync(function(data) {
    gameConfig.dimensions = parseInt(data.dimensions);
    gameConfig.winningScore = parseInt(data.winningScore);
});

Mobile('getGameConfig').registerSync(function() {
    return gameConfig;
});

Mobile('getGame').registerSync(function() {
    return game;
});

Mobile('connectToServer').registerAsync(function(ip, callback) {
    alert.call('Connecting to server');
    var client = server.createClient(null, url, key, ip, port);
    client.on('connect', function(client) {
        alert.call('Connected to server');
        try {
        var peerData = {
            port: port,
            url: url,
            ip: getLocalIP()
        };

        alert.call('Get game data');
        client.Call('connectToServer', peerData, function(game, err) {
            if (err) {
                alert.call('Error while calling server\'s method. Code: ' + err);
            } else if (!game) {
                alert.call('Peer is busy');
            } else {
                alert.call('Game data ready. Dimensions: ' + game.dimensions);
                game = game;
                peer = client;
                callback();
                Mobile('start').call();
            }
        });
        } catch (err) { alert.call(err.message); }
    });

    client.on('close', function(client) {
        alert.call('Peer disconnected');
        peer = null;
        game = null;
    });

    client.on('error', function(client, err) {
        alert.call('Error: ' + err);
    });

    client.Connect();
});

function getLocalIP() {
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

    // temp fix for emulator
    return (ips[0] === '10.0.2.15' ? '192.168.0.104' : ips[0]);
}

Mobile('getLocalIP').registerSync(getLocalIP);
server.start();
