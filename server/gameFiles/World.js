const coliderHelper = require('../gameFiles/ColiderHelper.js');
const PlayerContainer = require('../playerFiles/PlayerContainer.js');
const Wall = require('../gameFiles/Wall.js');
const InvisRune = require('../gameFiles/InvisRune.js');
const domainEvents = require('../helpers/DomainEvents');

class World {
    static isCircleColidingWithWall(circle) {
        var isColiding = false;
        this.walls.forEach(wall => {
            var res = coliderHelper.IsColidingWithWall(circle, wall);
            if (res) {
                isColiding = true;
                return isColiding;
            }
        });
        return isColiding;
    }

    static isPlayerOutOfBounds(player) {
        if (player.position.x - player.radius < 0) return true;
        if (player.position.x + player.radius > this.width) return true;
        if (player.position.y - player.radius < 0) return true;
        if (player.position.y + player.radius > this.height) return true;
        return false;
    }
    
    static CreateWall(x, y, width, height) {
        let wall = new Wall(this.walls.length, x, y, width, height);

        this.walls.push(wall);

        return wall;
    }

    static GetRandomPosition(circle) {
        circle.position.x = ~~this.getRandomArbitrary(0 + circle.radius, World.width - circle.radius);
        circle.position.y = ~~this.getRandomArbitrary(0 + circle.radius, World.height - circle.radius);
        if (this.isCircleColidingWithWall(circle)) {
            this.GetRandomPosition(circle);
        }
    }

    static startSpawningInvises(playerContainer) {
        if (this.invisSpawningStarted) {
            return;
        }
        this.invisSpawningStarted = true;
        // setTimeout(this.spawnInvis(playerContainer), this.getRandomArbitrary(5000, 10000));

        this.spawnInvis(playerContainer);
    }

    static spawnInvis(playerContainer) {
        if (playerContainer.invisRunes.length < 5) {
            let invis = new InvisRune(World.InvisCounter, 0, 0);
            World.GetRandomPosition(invis);;
            playerContainer.invisRunes.push(invis);
            domainEvents.emit("invisSpawned", invis);
            World.InvisCounter++;
        }
        setTimeout(() => { this.spawnInvis(playerContainer) }, this.getRandomArbitrary(5000, 10000));
    }
    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}
World.walls = [];
World.width = 1500;
World.height = 730;
World.InvisCounter = 0;
World.invisSpawningStarted = false;

module.exports = World;