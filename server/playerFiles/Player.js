const colors = require('../helpers/ColorProvider.js');
const Direction = require('../helpers/Direction.js');
const World = require('../gameFiles/World.js');
const domainEvents = require('../helpers/DomainEvents');

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
        this.direction = -1;
        this.isInvisible = false;
    }

    pad = function(s) {
        var s = s.toString();
        while (s.length < 4) {s = "0" + s;}
        return s;
    }

    getPlayerPositionData(){
        return this.pad(this.position.x) + this.pad(this.position.y) + this.id;
    }

    changePosition() {
        if (this.direction === -1) return;
        let prevX = this.position.x;
        let prevY = this.position.y;

        if (this.direction == Direction.Left){
            this.position.x -= this.movementSpeed;
        } 
        else if (this.direction == Direction.LeftUp) {
            this.position.x -= this.movementSpeed;
            this.position.y -= this.movementSpeed;
        } 
        else if (this.direction == Direction.Up) {
            this.position.y -= this.movementSpeed;
        } 
        else if (this.direction == Direction.RightUp) {
            this.position.y -= this.movementSpeed;
            this.position.x += this.movementSpeed;
        } 
        else if (this.direction == Direction.Right) {
            this.position.x += this.movementSpeed;
        } 
        else if (this.direction == Direction.RightDown) {
            this.position.x += this.movementSpeed;
            this.position.y += this.movementSpeed;
        } 
        else if (this.direction == Direction.Down) {
            this.position.y += this.movementSpeed;
        } 
        else if (this.direction == Direction.LeftDown) {
            this.position.y += this.movementSpeed;
            this.position.x -= this.movementSpeed;
        }

        if (World.isCircleColidingWithWall(this)){
            this.position.x = prevX;
            this.position.y = prevY;
            return;
        }
        if (World.isPlayerOutOfBounds(this)) {
            this.position.x = prevX;
            this.position.y = prevY;
            return;
        }
    
        domainEvents.emit('playerMoved', this);
    }
}

module.exports = Player;