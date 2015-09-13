angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    'jxcoreSrvc',
    'gameConfig',
    
    function (scope, jxcoreSrvc, gameConfig) {
        scope.gameConfig = gameConfig;
        scope.setGameConfig = function () {
            jxcoreSrvc.call('setGameConfig', scope.gameConfig).then(function () {
                alert('Game settings saved');
            });
        };
    }
]);