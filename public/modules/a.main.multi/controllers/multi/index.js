angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    'game',
    'jxcoreSrvc',
    
    function (scope, game, jxcoreSrvc) {
        scope.game = game;
        scope.winner;

        scope.init = function (game) {
            game.on('over', function () {
                scope.winner = game.winner;
                scope.$digest();
                jxcoreSrvc.call('finish');
            });

            game.on('filled', function (data) {
                if (data.type === game.me) {
                    jxcoreSrvc.call('fill', data);
                }
            });

            scope.$on('server:filled', function (e, data) {
                game.fill(data.i, data.j);
            });

            scope.$on('$destroy', function () {
                if (!game.winner) {
                    jxcoreSrvc.call('finish');
                }
            });
        };
    }
]);