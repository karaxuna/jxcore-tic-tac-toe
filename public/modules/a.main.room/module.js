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
                    game: ['$stateParams', '$state', 'socketSrvc', function (stateParams, state, socketSrvc) {
                        return socketSrvc.emit('enter-game', {
                            gameId: stateParams.gameId
                        }).catch(function () {
                            state.go('a.main.find');
                        });
                    }]
                }
            });
        }
    ]);