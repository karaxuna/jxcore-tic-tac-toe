angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$state',
    'jxcoreSrvc',

    function (scope, state, jxcoreSrvc) {
        scope.model = {
            ip: null
        };

        scope.connectToServer = function () {
            jxcoreSrvc.call('connectToServer', scope.model.ip).then(function () {
                state.go('^.multi');
            });
        };
    }
]);