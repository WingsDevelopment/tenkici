//where objectA and objectB must have position {x,y} and radius

class ColiderHelper{
    static IsTwoCirclesColiding(playerA, playerB) {
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
    static IsColidingWithWall(circle, wall)
    {
        var distX = Math.abs(circle.position.x - wall.x - wall.width / 2);
        var distY = Math.abs(circle.position.y - wall.y - wall.height / 2);

        if (distX > (wall.width / 2 + circle.radius)) {
            return false;
        }
        if (distY > (wall.height / 2 + circle.radius)) {
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
        return (dx * dx + dy * dy <= (circle.radius * circle.radius));
    }
}

module.exports = ColiderHelper;