//where objectA and objectB must have position {x,y} and radius

class ColiderHelper{
    static IsColiding(objectA, objectB) {
        let distSq = (objectA.position.x - objectB.position.x) * 
                     (objectA.position.x - objectB.position.x) + 
                     (objectA.position.y - objectB.position.y) * 
                     (objectA.position.y - objectB.position.y); 
        let radSumSq = (objectA.radius + objectB.radius) *
                       (objectA.radius + objectB.radius); 
        if (distSq >= radSumSq) {
            return false; 
        }
        else {
            return true; 
        }
    }
}


module.exports = ColiderHelper;