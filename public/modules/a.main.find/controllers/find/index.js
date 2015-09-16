angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$state',
    'socketSrvc',
    'games',

    function (scope, state, socketSrvc, games) {
        scope.games = games;

        scope.enterGame = function (game) {
            socketSrvc.emit('enter-game', {
                gameId: game.id
            }).then(function () {
                state.go('^.room', {
                    gameId: game.id
                });
            });
        };

        scope.$on('server:game-started', function (e, data) {
            utils.findOne(scope.games, {
                id: data.gameId
            }, function (game) {
                if (game) {
                    game.started = true;
                }
            });
        });

        scope.$on('server:game-created', function (e, game) {
            scope.games.push(game);
        });

        scope.$on('server:game-discarded', function (e, data) {
            utils.findOne(scope.games, {
                id: data.gameId
            }, function (game, index) {
                scope.games.splice(index, 1);
            });
        });
    }
]);