const colors = require('../helpers/ColorProvider.js');
const Direction = require('../helpers/Direction.js');

class Player {
    constructor(id) {
        this.id = id;
        this.health = 10;
        this.isDead = false;
        this.position = {
            x: 300,
            y: 300,
        }
        this.color = colors[id];
        this.movementSpeed = 5;
    }
    changePosition(direction) {
        switch(direction) {
            case direction == Direction.Left:
                this.position.x -= this.movementSpeed;
                break;
            case direction == Direction.LeftUp:
                this.position.x -= this.movementSpeed;
                this.position.y += this.movementSpeed;
                break;
            case direction == Direction.Up:
                this.position.y += this.movementSpeed;
                break;
            case direction == Direction.RightUp:
                this.position.y += this.movementSpeed;
                this.position.x += this.movementSpeed;
                break;
            case direction == Direction.Right:
                this.position.x += this.movementSpeed;
                break;
            case direction == Direction.RightDown:
                this.position.x += this.movementSpeed;
                this.position.y -= this.movementSpeed;
                break;
            case direction == Direction.Down:
                this.position.y -= this.movementSpeed;
                break;
            case direction == Direction.LeftDown:
                this.position.y -= this.movementSpeed;
                this.position.x -= this.movementSpeed;
                break;
        }
    }
}

module.exports = Player;