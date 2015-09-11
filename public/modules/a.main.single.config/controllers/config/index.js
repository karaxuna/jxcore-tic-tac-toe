angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$state',
    
    function (scope, state) {
        scope.model = {
            dimensions: 3,
            winningScore: 3
        };

        scope.start = function () {
            state.go('^.game', scope.model);
        };
    }
]);