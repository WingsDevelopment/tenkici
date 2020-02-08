const Player = require('./Player.js');
const PlayerType = require('./PlayerType.js');
const domainEvents = require('../helpers/DomainEvents');

class Peasant extends Player {
    constructor(id, color, playerOrder) {
        super(id, color, playerOrder);
        this.playerType = PlayerType.Peasant;
        this.movementSpeed = 5;
        this.health = 1;
        this.radius = 20;
        this.position = {
            x: 400,
            y: 300,
        }
    }
    
    ColidedWithVampire() {
        this.health = 0;
        this.isDead = true;
        domainEvents.emit('playerDied', this);
    }
}

module.exports = Peasant;