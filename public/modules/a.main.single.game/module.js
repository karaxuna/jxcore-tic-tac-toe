angular
    .module(module.name, module.dependencies)
    .config([
        '$stateProvider',
        function (stateProvider) {
            stateProvider.state(module.name, {
                url: '/game?dimensions?winningScore',
                templateUrl: module.path + '/views/layout.html',
                controller: module.name + '.c.game'
            });
        }
    ]);