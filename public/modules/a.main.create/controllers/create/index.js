angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$state',
    'socketSrvc',

    function (scope, state, socketSrvc) {
        scope.game = {
            width: 3,
            height: 3,
            letters: ['X', 'O'],
            winningScore: 3,
            turnIndex: 0
        };

        scope.create = function () {
            socketSrvc.emit('create-game', scope.game).then(function (game) {
                state.go('^.room', {
                    gameId: game.id
                });
            });
        };
    }
]);