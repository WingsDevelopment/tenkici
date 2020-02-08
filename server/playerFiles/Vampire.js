const Player = require('./Player.js');
const PlayerType = require('./PlayerType.js');

class Vampire extends Player {
    constructor(id, color, playerOrder) {
        super(id, color, playerOrder);
        this.playerType = PlayerType.Vampire;
        this.movementSpeed = 7;
        this.health = 3;
        this.radius = 35;
        this.color = "black";
    }
}

module.exports = Vampire;