module.exports = {
    getLocalIP: function getLocalIP() {
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

        return ips[0];
    }
};