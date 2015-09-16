angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$state',
    'localIP',
    
    function (scope, state, localIP) {
        scope.localIP = localIP;
    }
]);