const coliderHelper = require('../gameFiles/ColiderHelper.js')
const Wall = require('../gameFiles/Wall.js')

class World {
    static isPlayerColidingWithWall(player) {
        var isColiding = false;
        this.walls.forEach(wall => {
            var res = coliderHelper.IsColidingWithWall(player, wall);
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
}
World.walls = [];
World.width = 1500;
World.height = 730;

module.exports = World;