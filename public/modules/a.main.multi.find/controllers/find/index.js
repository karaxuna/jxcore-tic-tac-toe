angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$timeout',
    'jxcoreSrvc',
    
    function (scope, timeout, jxcoreSrvc) {
        scope.localIps = [];
        timeout(function () {
            jxcoreSrvc.call('getLocalIPs').then(function (localIps) {
                scope.localIps = localIps;
            });
        }, 500);
    }
]);