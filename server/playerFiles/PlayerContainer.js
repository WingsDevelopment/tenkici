const Player = require('./Player.js')

class PlayerContainer {
    static maxPlayers = 15;

    static createPlayer() {
        if (this.players.length >= this.maxPlayers) {
            return null;
        }
        let player = new Player(this.players.length);
        this.players.push(player);
        return player;
    }

    static getPlayer(id) {
        return this.players[id];
    }

    static removePlayer(id) {
        let index = this.players.findIndex(x => x.id === id);

        if (index > -1) {
            this.players.splice(index, 1);
        }
    }
}
PlayerContainer.players = [];

module.exports = PlayerContainer;