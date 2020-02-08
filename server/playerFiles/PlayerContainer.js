const Peasant = require('./Peasant.js');
const Vampire = require('./Vampire.js');
const PlayerType = require('./PlayerType.js');
const colors = require('../helpers/ColorProvider.js')
const ColiderHelper = require('../gameFiles/ColiderHelper.js')

class PlayerContainer {
    static createPlayer(id, playerType) {
        let color = null;
        let playerOrder = 0;
        for(let i = 0; i < this.maxPlayers; i++) {
            if (this.slots[i] == null) {
                this.slots[i] = true;
                color = colors[i];
                playerOrder = i;
                break;
            }
        }

        var player;
        if (playerType === PlayerType.Peasant) {
            player = new Peasant(id, color, playerOrder);
        } else if (playerType === PlayerType.Vampire) {
            player = new Vampire(id, color, playerOrder);
        }
        this.players[id] = player;
        return player;
    }

    static getPlayer(id) {
        return this.players[id];
    }

    static removePlayer(id) {
        let player = this.players[id];
        if (player != null) {
            this.slots[player.playerOrder] = null;

            delete this.players[id];
        }
    }

    static checkColisions() {
        if (Object.keys(this.players).length > 1) {
            var vampires = Object.values(this.players).filter(x => x.playerType === PlayerType.Vampire);
            var peasants = Object.values(this.players).filter(x => x.playerType === PlayerType.Peasant);
            vampires.forEach(vampire => {
                peasants.forEach(peasant => {
                    var colided = ColiderHelper.IsColiding(vampire, peasant);
                    if (colided) {
                        peasant.ColidedWithVampire();
                    }
                });
            });
        }
    }

    static IsPossibleToCreatePlayer(player) {
        var vampires = Object.values(this.players).find(x => x.playerType === 1);
        console.log(vampires);
        
        // if (this.players.length >= this.maxPlayers) {
        //     return null;
        // }
        // if (Object.values(this.players).find(x => x.playerType === PlayerType.Vampire).length > this.maxVampires) {
        //     throw Error("Too many vampires! Max is: " + this.maxVampires);
        // }
    }
}
PlayerContainer.maxPlayers = 15;
PlayerContainer.maxVampires = 3;
PlayerContainer.slots = [];
PlayerContainer.players = {};

module.exports = PlayerContainer;