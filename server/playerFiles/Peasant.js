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
        this.isInvisible = false;
    }

    consumeInvisRune() {
        if (this.isInvisible) return false;

        this.setInvis(true);
        setTimeout(() => { this.setInvis(false) } , 3000);
        return true;
    }
    setInvis(isInvisible) {
        this.isInvisible = isInvisible;

        if (this.isInvisible) {
            this.movementSpeed = 7;
            domainEvents.emit("invisConsumed", this.id);
        } else {
            this.movementSpeed = 5;
            domainEvents.emit("invisExpired", this.id);
        }
    }
    
    ColidedWithVampire() {
        if (this.isInvisible) return;

        this.health = 0;
        this.isDead = true;
        this.isInvisible = false;
        domainEvents.emit('playerDied', this.id);
    }
}

module.exports = Peasant;