const colors = require('../helpers/ColorProvider.js');
const Direction = require('../helpers/Direction.js');


class Player {
    constructor(id, color, playerOrder) {
        this.id = id;
        this.isDead = false;
        this.position = {
            x: 300,
            y: 300,
        }
        this.color = color;
        this.playerOrder = playerOrder;
        //nasledjeno
        this.health = 0;
        this.radius = 0;
        this.movementSpeed = 0;
    }

    pad = function(s) {
        var s = s.toString();
        while (s.length < 4) {s = "0" + s;}
        return s;
    }

    getPlayerPositionData(){
        return this.pad(this.position.x) + this.pad(this.position.y) + this.id;
    }

    changePosition(direction) {
        if (direction == Direction.Left){
            this.position.x -= this.movementSpeed;
        } 
        else if (direction == Direction.LeftUp) {
            this.position.x -= this.movementSpeed;
            this.position.y -= this.movementSpeed;
        } 
        else if (direction == Direction.Up) {
            this.position.y -= this.movementSpeed;
        } 
        else if (direction == Direction.RightUp) {
            this.position.y -= this.movementSpeed;
            this.position.x += this.movementSpeed;
        } 
        else if (direction == Direction.Right) {
            this.position.x += this.movementSpeed;
        } 
        else if (direction == Direction.RightDown) {
            this.position.x += this.movementSpeed;
            this.position.y += this.movementSpeed;
        } 
        else if (direction == Direction.Down) {
            this.position.y += this.movementSpeed;
        } 
        else if (direction == Direction.LeftDown) {
            this.position.y += this.movementSpeed;
            this.position.x -= this.movementSpeed;
        }
    }
}

module.exports = Player;