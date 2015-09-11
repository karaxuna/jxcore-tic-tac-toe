angular
    .module(module.name, module.dependencies)
    .config([
        '$stateProvider',
        function (stateProvider) {
            stateProvider.state(module.name, {
                url: '/single',
                abstract: true,
                template: '<div ui-view></div>'
            });
        }
    ]);