const Peasant = require('./Peasant.js');
const Vampire = require('./Vampire.js');
const PlayerType = require('./PlayerType.js');
const colors = require('../helpers/ColorProvider.js')
const ColiderHelper = require('../gameFiles/ColiderHelper.js')
const domainEvents = require('../helpers/DomainEvents');
const World = require('../gameFiles/World');

class PlayerContainer {
    static createPlayer(id, playerType) {
        if (!this.IsPossibleToCreatePlayer(playerType)) return null;

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
        World.GetRandomPosition(player);

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
        if (Object.keys(this.players).length >= 1) {
            var vampires = Object.values(this.players).filter(x => x.playerType === PlayerType.Vampire);
            var peasants = Object.values(this.players).filter(x => x.playerType === PlayerType.Peasant);
            
            vampires.forEach(vampire => {
                peasants.forEach(peasant => {
                    var colidedWithVampire = ColiderHelper.IsTwoCirclesColiding(vampire, peasant);
                    if (colidedWithVampire) {
                        peasant.ColidedWithVampire();
                    }
                });
            });

            //rune check
            let invisRuneIdsToRemove = [];

            peasants.forEach(peasant => {
                this.invisRunes.forEach(rune => {
                    var colidedWithRune = ColiderHelper.IsTwoCirclesColiding(peasant, rune);
                    if (colidedWithRune) {
                        invisRuneIdsToRemove.push(rune.id);
                        this.pickedUpInvises++;
                    }
                });
            });
            this.deleteInvisFromMap(invisRuneIdsToRemove);
            if (invisRuneIdsToRemove.length > 0) {
                domainEvents.emit("deleteInvisesFromMap", invisRuneIdsToRemove);
            }
        }
    }

    static deleteInvisFromMap(invisRuneIdsToRemove){
        invisRuneIdsToRemove.forEach(invisId => {
            let index = this.invisRunes.findIndex(x => x.id == invisId);
            if (index != -1) {
                this.invisRunes.splice(index, 1);
            }
        });
    }

    static IsPossibleToCreatePlayer(playerType) {
        var vampires = Object.values(this.players).filter(x => x.playerType === PlayerType.Vampire);
        let num = vampires.length;
        if (this.players.length + 1 >= this.maxPlayers) {
            return false;//throw new Error("Too many players! Max is: " + this.maxPlayers);
        }
        if (playerType === PlayerType.Vampire) num++

        if (num > this.maxVampires) {
            return false;//throw new Error("Too many vampires! Max is: " + this.maxVampires);
        }
        return true;
    }

    static ConsumeInvises() {
        this.playerIdsForInvisRequests.forEach(playerId => {
            let player = this.players[playerId];
            if (player == null ||
                player.playerType !== PlayerType.Peasant ||
                player.isDead ||
                this.pickedUpInvises <= 0) return;
            
            let consumed = player.consumeInvisRune();
            
            if (consumed) this.pickedUpInvises--;
        });
        this.playerIdsForInvisRequests = [];
    }
}
PlayerContainer.maxPlayers = 15;
PlayerContainer.maxVampires = 3;
PlayerContainer.slots = [];
PlayerContainer.players = {};
PlayerContainer.invisRunes = [];
PlayerContainer.pickedUpInvises = 0;
PlayerContainer.playerIdsForInvisRequests = [];

module.exports = PlayerContainer;