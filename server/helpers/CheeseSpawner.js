class CheeseSpawner {
    static spawn(socketIo) {

    }

    static myFunc(Socketio) {
    
        Socketio.emit("cheseSpawned", {
            x: getRandomArbitrary(100, 1000),
            y: getRandomArbitrary(100, 1000)    
        })
    };

    static  getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}
module.exports = CheeseSpawner;