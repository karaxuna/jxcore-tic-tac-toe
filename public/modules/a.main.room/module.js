angular
    .module(module.name, module.dependencies)
    .config([
        '$stateProvider',
        function (stateProvider) {
            stateProvider.state(module.name, {
                url: '/room/:gameId',
                templateUrl: module.path + '/views/layout.html',
                controller: module.name + '.c.room',
                resolve: {
                    game: ['$stateParams', 'socketSrvc', function (stateParams, socketSrvc) {
                        return socketSrvc.emit('enter-game', {
                            gameId: stateParams.gameId
                        });
                    }]
                }
            });
        }
    ]);