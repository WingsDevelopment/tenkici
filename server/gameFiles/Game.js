const PlayerContainer = require('../playerFiles/PlayerContainer.js');

class Game {
    static Update() {
        Object.keys(PlayerContainer.players).forEach(function(key) {
            PlayerContainer.players[key].changePosition();
        });
        PlayerContainer.checkColisions();
    }
}

module.exports = Game;