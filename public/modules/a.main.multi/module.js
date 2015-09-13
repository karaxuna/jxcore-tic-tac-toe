angular
    .module(module.name, module.dependencies)
    .config([
        '$stateProvider',
        function (stateProvider) {
            stateProvider.state(module.name, {
                url: '/multi',
                templateUrl: module.path + '/views/layout.html',
                controller: module.name + '.c.multi',
                resolve: {
                    game: ['jxcoreSrvc', function (jxcoreSrvc) {
                        return jxcoreSrvc.call('getGame');
                    }]
                }
            });
        }
    ]);