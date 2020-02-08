//where objectA and objectB must have position {x,y} and radius

class ColiderHelper{
    static IsColiding(playerA, playerB) {
        let distSq = (playerA.position.x - playerB.position.x) * 
                     (playerA.position.x - playerB.position.x) + 
                     (playerA.position.y - playerB.position.y) * 
                     (playerA.position.y - playerB.position.y); 
        let radSumSq = (playerA.radius + playerB.radius) *
                       (playerA.radius + playerB.radius); 
        if (distSq >= radSumSq) {
            return false; 
        }
        else {
            return true; 
        }
    }
    static IsColidingWithWall(player, wall)
    {
        var distX = Math.abs(player.position.x - wall.x - wall.width / 2);
        var distY = Math.abs(player.position.y - wall.y - wall.height / 2);

        if (distX > (wall.width / 2 + player.radius)) {
            return false;
        }
        if (distY > (wall.height / 2 + player.radius)) {
            return false;
        }

        if (distX <= (wall.width / 2)) {
            return true;
        }
        if (distY <= (wall.height / 2)) {
            return true;
        }

        var dx = distX - wall.width / 2;
        var dy = distY - wall.height / 2;
        return (dx * dx + dy * dy <= (player.radius * player.radius));
    }
}

module.exports = ColiderHelper;