angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$stateParams',
    
    function (scope, stateParams) {
        scope.dimensions = parseInt(stateParams.dimensions);
        scope.winningScore = parseInt(stateParams.winningScore);
    }
]);