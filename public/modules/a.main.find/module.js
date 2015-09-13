angular
    .module(module.name, module.dependencies)
    .config([
        '$stateProvider',
        function (stateProvider) {
            stateProvider.state(module.name, {
                url: '/find',
                templateUrl: module.path + '/views/layout.html',
                controller: module.name + '.c.find'
            });
        }
    ]);