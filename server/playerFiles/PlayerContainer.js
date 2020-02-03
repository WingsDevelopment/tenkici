const Player = require('./Player.js')

class PlayerContainer {
    static maxPlayers = 5;

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
}
PlayerContainer.players = [];

module.exports = PlayerContainer;