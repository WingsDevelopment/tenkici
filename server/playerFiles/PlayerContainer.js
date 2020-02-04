const Player = require('./Player.js');
const colors = require('../helpers/ColorProvider.js')

class PlayerContainer {

    static createPlayer(id) {
        if (this.players.length >= this.maxPlayers) {
            return null;
        }

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
            this.slots[player.playerOrder] = null;

            delete this.players[id];
        }
    }
}
PlayerContainer.maxPlayers = 15;
PlayerContainer.slots = [];
PlayerContainer.players = {};

module.exports = PlayerContainer;