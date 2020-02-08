const Express = require('express')();
const Http = require('http').Server(Express);
const Socketio = require('socket.io')(Http);
const PlayerContainer = require('./playerFiles/PlayerContainer.js');
const domainEvents = require('./helpers/DomainEvents.js');

Socketio.on("connection", socket => {
    try {
        socket.on("createPlayer", (playerType) => {
            let player = PlayerContainer.createPlayer(socket.id, playerType);
            socket.emit("join", player);
            socket.emit("initOthers", PlayerContainer.players);
            Socketio.emit("playerAdded", player);
        });
        
        socket.on("move", direction => {
            let player = PlayerContainer.getPlayer(socket.id);
    
            player.changePosition(direction);
    
            PlayerContainer.checkColisions();
    
            Socketio.emit("moved", Buffer.from(player.getPlayerPositionData(), 'utf8' ));
        });
    
        socket.on("disconnect", () => {
            console.log('disc');
            PlayerContainer.removePlayer(socket.id)
    
            Socketio.emit("playerRemoved", socket.id);
        })

        //domain events
        domainEvents.on('playerDied', (player) => {
            socket.emit("playerDied", player.id);
        });
    }
    catch (e) {
        // Socketio.emit("serverError", e.message);
    }
});

Http.listen('3000', () => {
    console.log('listening at :3000...');
});