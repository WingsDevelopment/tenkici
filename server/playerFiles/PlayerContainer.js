const Player = require('./Player.js');
const colors = require('../helpers/ColorProvider.js')

class PlayerContainer {
    static maxPlayers = 15;
    static slots = [];
    static players = {};

    static createPlayer(id) {
        if (this.players.length >= this.maxPlayers) {
            return null;
        }

        let color = null;
        let playerOrder = 0;
        for(let i = 0; i < this.maxPlayers; i++) {
            if (this.slots[i] == null && this.slots[i] !== true) {
                this.slots[i] = true;
                color = colors[i];
                playerOrder = i;
                break;
            }
        }

        let player = new Player(id, color, playerOrder);

        this.players[id] = player;

        return player;
    }

    static getPlayer(id) {
        return this.players[id];
    }

    static removePlayer(id) {
        let player = this.players[id];
        if (player != null) {
            this.slots[player.playerOrder] = false;

            delete this.players[id];
        }
    }
}

module.exports = PlayerContainer;