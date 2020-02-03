const Express = require('express')();
const Http = require('http').Server(Express);
const Socketio = require('socket.io')(Http);
const PlayerContainer = require('./playerFiles/PlayerContainer.js');

Socketio.on("connection", socket => {
    socket.on("createPlayer", () => {
        let player = PlayerContainer.createPlayer();
        socket.emit("playerCreated", player);
        Socketio.emit("playersChanged", PlayerContainer.players);
    });
    
    socket.on("move", data => {
        let player = PlayerContainer.getPlayer(data.id);

        player.changePosition(data.direction);

        Socketio.emit("moved", player);
    });

    socket.on("removePlayer", player => {
        PlayerContainer.removePlayer(player.id);

        Socketio.emit("playersChanged", PlayerContainer.players);
    });
});

Http.listen('3000', () => {
    console.log('listening at :3000...');
});