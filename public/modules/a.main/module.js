angular
    .module(module.name, module.dependencies)
    .config([
        '$stateProvider',
        function (stateProvider) {
            stateProvider.state(module.name, {
                url: '',
                templateUrl: module.path + '/views/layout.html',
                controller: module.name + '.c.main',
                resolve: {
                    localIP: ['jxcoreSrvc', function (jxcoreSrvc) {
                        return jxcoreSrvc.call('getLocalIP', true);
                    }]
                }
            });
        }
    ]);