const colors = require('../helpers/ColorProvider.js');
const Direction = require('../helpers/Direction.js');

class Player {
    constructor(id, color) {
        this.id = id;
        this.health = 10;
        this.isDead = false;
        this.position = {
            x: 300,
            y: 300,
        }
        this.color = color;
        this.movementSpeed = 5;
    }

    changePosition(direction) {
        if (direction == Direction.Left){
            this.position.x -= this.movementSpeed;
        } 
        else if (direction == Direction.LeftUp) {
            this.position.x -= this.movementSpeed;
            this.position.y += this.movementSpeed;
        } 
        else if (direction == Direction.Up) {
            this.position.y += this.movementSpeed;
        } 
        else if (direction == Direction.RightUp) {
            this.position.y += this.movementSpeed;
            this.position.x += this.movementSpeed;
        } 
        else if (direction == Direction.Right) {
            this.position.x += this.movementSpeed;
        } 
        else if (direction == Direction.RightDown) {
            this.position.x += this.movementSpeed;
            this.position.y -= this.movementSpeed;
        } 
        else if (direction == Direction.Down) {
            this.position.y -= this.movementSpeed;
        } 
        else if (direction == Direction.LeftDown) {
            this.position.y -= this.movementSpeed;
            this.position.x -= this.movementSpeed;
        }
    }
}

module.exports = Player;