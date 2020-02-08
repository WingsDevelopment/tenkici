const World = require('./World.js');

class MapContainer {
    static LoadMap (mapNumber) {
        if (mapNumber === 1) {
            //top left walls
            World.CreateWall(100, 100, 300, 20);
            World.CreateWall(100, 120, 20, 150);

            //bottom left walls
            World.CreateWall(200, 610, 100, 20);
            World.CreateWall(200, 335, 100, 20);
            World.CreateWall(100, 410, 20, 200);
            
            //center
            World.CreateWall(500, 310, 100, 20);
            World.CreateWall(700, 310, 20, 100);
            World.CreateWall(600, 535, 100, 20);
            World.CreateWall(500, 535, 20, 100);

            //top right walls
            World.CreateWall(1100, 110, 100, 20);
            World.CreateWall(1100, 235, 100, 20);
            World.CreateWall(1000, 110, 20, 200);
            World.CreateWall(1350, 110, 20, 530);

            //bottom right walls
            World.CreateWall(1100, 610, 100, 20);
            World.CreateWall(1000, 410, 20, 200);
        }
        if (mapNumber === 2) {

        }
    }
}

module.exports = MapContainer;