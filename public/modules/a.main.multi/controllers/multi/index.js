angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    'game',
    'jxcoreSrvc',
    
    function (scope, game, jxcoreSrvc) {
        scope.game = game;
        scope.init = function (game) {
            game.on('over', function () {
                jxcoreSrvc.call('over', {
                    winner: this.winner
                });
            });

            game.on('filled', function (data) {
                // Check if I filled
                if (data.type === game.me) {
                    jxcoreSrvc.call('fill', data);
                }
            });

            jxcoreSrvc.on('filled', function (data) {
                game.fill(data.i, data.j);
            });
        };
    }
]);