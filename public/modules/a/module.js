var app = angular
	.module(module.name, [
        'ui.router',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'btford.socket-io'
    ].concat(module.dependencies))
	.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
		function(stateProvider, urlRouterProvider, locationProvider){
			stateProvider.state(module.name, {
				url: '',
				template: '<div ui-view></div>',
				abstract: true,
                resolve: {
                    socketSrvc: ['$q', '$rootScope', 'socketFactory', 'host', 'notify',
                        function (q, rootScope, socketFactory, host, notify) {
                            if (host === '/') {
                                host = ':' + (location.port || 80) + '/';
                            }

                            try {
                                var s = socketFactory({
                                    prefix: 'server:',
                                    ioSocket: io.connect(host)
                                });

                                var loading = 0;
                                var oemit = s.emit;
                                s.emit = function (name, data) {
                                    if(++loading === 1) rootScope.$broadcast('loading:progress');
                                    console.log('emitted', name);
                                    var defered = q.defer();
                                    oemit.call(s, name, data, function (err, data) {
                                        if(--loading === 0) rootScope.$broadcast('loading:finish');
                                        if (err) {
                                            notify.error(name + ': ' + err);
                                            defered.reject(err);
                                        } else {
                                            console.log('answered', name);
                                            defered.resolve(data);
                                        }
                                    });
                                    return defered.promise;
                                };

                                s.forward([
                                    'game-created',
                                    'player-joined-game',
                                    'game-started',
                                    'filled',
                                    'player-left-game',
                                    'game-discarded'
                                ]);

                                return s;
                            } catch (err) {
                                alert(err.message);
                            }
                        }
                    ]
                }
			});
			locationProvider.html5Mode(false).hashPrefix('!');
		}
	])
	.run(['$rootScope', 'enums', function (rootScope, enums) {
        rootScope.enums = enums;
    }]);

// start angular after jxcore is ready
(function check() {
    if (typeof jxcore === 'undefined') {
        setTimeout(check, 5);
    } else if (jxcore === 'none' || cordova === 'none') {
        init('/');
    } else {
        jxcore.isReady(function () {
            jxcore('alert').register(alert);
            jxcore('app.js').loadMainFile(function(result, err) {
                if (err) {
                    alert(err);
                } else {
                    jxcore('getLocalIP').call(function (ip) {
                        init(ip);
                    });
                }
            });
        });
    }
})();

function init(host) {
    var s = document.createElement('script');
    s.async = false;
    s.src = host + 'socket.io/socket.io.js';
    document.body.appendChild(s);

    (function _check() {
        if (window.io) {
            app.value('enums', enums);
            app.value('host', host);
            angular.bootstrap(document, [app.name]);
        } else {
            setTimeout(_check, 5);
        }
    })();
}