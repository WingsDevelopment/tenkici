const PlayerContainer = require('../playerFiles/PlayerContainer.js');
const World = require('./World.js');


class Game {
    static Update() {
        try {
            PlayerContainer.ConsumeInvises();

            Object.keys(PlayerContainer.players).forEach(function(key) {
                let player = PlayerContainer.players[key];
                if (player != null) {
                    PlayerContainer.players[key].changePosition();
                }
            });
            
            PlayerContainer.checkColisions();
    
            World.startSpawningInvises(PlayerContainer);
        }
        catch (e) {

        }
    }
}

module.exports = Game;