const Express = require('express')();
const Http = require('http').Server(Express);
const Socketio = require('socket.io')(Http);
const PlayerContainer = require('./playerFiles/PlayerContainer.js');

Socketio.on("connection", socket => {
    let player = PlayerContainer.createPlayer();
    socket.emit("playerCreated", player);
    
    Socketio.on("move", data => {
        let player = PlayerContainer.getPlayer(data.id);

        player.changePosition(data.direction);

        socket.emit("position", player.position);
    });
});


Http.listen('3000', () => {
    console.log('listening at :3000...');
});