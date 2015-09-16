angular
    .module(module.name, module.dependencies)
    .config([
        '$stateProvider',
        function (stateProvider) {
            stateProvider.state(module.name, {
                url: '',
                templateUrl: module.path + '/views/layout.html',
                controller: module.name + '.c.find',
                resolve: {
                    games: ['socketSrvc', function (socketSrvc) {
                        return socketSrvc.emit('get-games');
                    }]
                }
            });
        }
    ]);