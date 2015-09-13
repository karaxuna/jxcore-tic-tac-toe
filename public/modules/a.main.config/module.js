angular
    .module(module.name, module.dependencies)
    .config([
        '$stateProvider',
        function (stateProvider) {
            stateProvider.state(module.name, {
                url: '/config',
                templateUrl: module.path + '/views/layout.html',
                controller: module.name + '.c.config',
                resolve: {
                    gameConfig: ['jxcoreSrvc', function (jxcoreSrvc) {
                        return jxcoreSrvc.call('getGameConfig');
                    }]
                }
            });
        }
    ]);