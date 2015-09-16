angular.module(module.name).controller(module.name + '.c.' + current.name, [
    '$scope',
    '$state',
    'game',
    'socketSrvc',
    
    function (scope, state, game, socketSrvc) {
        scope.game = game;
        scope.meIndex;
        scope.over;
        scope.letters;

        scope.$watchCollection('game.players', function (players) {
            scope.letters = ['X', 'O', 'Z', 'Y', 'K', 'P', 'R', 'S', 'T', 'Q'].slice(0, players.length);            
        });

        scope.start = function () {
            socketSrvc.emit('start-game', {
                gameId: scope.game.id
            });
        };

        scope.init = function (game) {
            game.on('filled', function (data) {
                socketSrvc.emit('fill', {
                    i: data.i,
                    j: data.j,
                    gameId: scope.game.id
                });
            });

            game.on('over', function (data) {
                if (game.winner) {
                    alert('Winner is ' + game.winner);
                } else {
                    alert('Draw');
                }
                scope.over = true;
            });

            scope.$on('server:filled', function (e, data) {
                if (data.gameId === scope.game.id) {
                    game.fill(data.i, data.j, false, true);
                }
            });
        };

        scope.$on('$destroy', function () {
            socketSrvc.emit('leave-game').then(function () {
                alert('You left the game');
            });
        });

        scope.$on('server:game-discarded', function (e, data) {
            if (data.gameId === scope.game.id) {
                alert('Game has been discarded');
                state.go('^.find');
            }
        });

        scope.$on('server:player-left-game', function (e, data) {
            if (data.gameId === scope.game.id) {
                var players = scope.game.players;
                players.splice(players.indexOf(data.playerSocketId), 1);
            }
        });

        scope.$on('server:player-joined-game', function (e, data) {
            if (data.gameId === scope.game.id) {
                scope.game.players.push(data.playerSocketId);
            }
        });

        scope.$on('server:game-started', function (e, data) {
            if (data.gameId === scope.game.id) {
                scope.meIndex = data.meIndex;
                scope.game.started = true;
            }
        });
    }
]);