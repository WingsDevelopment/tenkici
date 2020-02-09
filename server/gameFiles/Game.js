const PlayerContainer = require('../playerFiles/PlayerContainer.js');
const World = require('./World.js');


class Game {
    static Update() {
        PlayerContainer.ConsumeInvises();

        Object.keys(PlayerContainer.players).forEach(function(key) {
            PlayerContainer.players[key].changePosition();
        });
        
        PlayerContainer.checkColisions();

        World.startSpawningInvises(PlayerContainer);
    }
}

module.exports = Game;