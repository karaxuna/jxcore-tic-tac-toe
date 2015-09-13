angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$state',
    'localIP',
    'jxcoreSrvc',
    
    function (scope, state, localIP, jxcoreSrvc) {
        scope.localIP = localIP;
        jxcoreSrvc.on('start', function () {
            state.go('a.main.multi');
        });
    }
]);