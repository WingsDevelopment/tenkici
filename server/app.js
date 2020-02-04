const Express = require('express')();
const Http = require('http').Server(Express);
const Socketio = require('socket.io')(Http);
const PlayerContainer = require('./playerFiles/PlayerContainer.js');
const CheeseSpawner = require('./helpers/CheeseSpawner.js');

Socketio.on("connection", socket => {

    socket.on("createPlayer", () => {
        let player = PlayerContainer.createPlayer(socket.id);
        socket.emit("join", player);
        socket.emit("initOthers", PlayerContainer.players);
        Socketio.emit("playerAdded", player);
    });
    
    socket.on("move", data => {
        let player = PlayerContainer.getPlayer(socket.id);

        player.changePosition(data.direction);

        Socketio.emit("moved", player);
    });

    socket.on("disconnect", () => {
        PlayerContainer.removePlayer(socket.id)

        Socketio.emit("playerRemoved", socket.id);
    })

    // setTimeout(myFunc(Socketio), 1500, 'funky');
});

Http.listen('3000', () => {
    console.log('listening at :3000...');
});