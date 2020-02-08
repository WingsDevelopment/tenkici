const Express = require('express')();
const Http = require('http').Server(Express);
const Socketio = require('socket.io')(Http);
const PlayerContainer = require('./playerFiles/PlayerContainer.js');
const domainEvents = require('./helpers/DomainEvents.js');
const MapContainer = require('./gameFiles/MapContainer.js');
const World = require('./gameFiles/World.js');
const Game = require('./gameFiles/Game.js');

MapContainer.LoadMap(1);
const hrtimeMs = function() {
    let time = process.hrtime()
    return time[0] * 1000 + time[1] / 1000000
}

const TICK_RATE = 60;
let tick = 0
let previous = hrtimeMs()
let tickLengthMs = 1000 / TICK_RATE

const loop = () => {
    setTimeout(loop, tickLengthMs)
    // let now = hrtimeMs()
    // let delta = (now - previous) / 1000
    Game.Update();
    // previous = now
    // tick++
}

loop()

Socketio.on("connection", socket => {
    try {
        socket.on("createPlayer", (playerType) => {
            let player = PlayerContainer.createPlayer(socket.id, playerType);
            socket.emit("join", player);
            socket.emit("initOthers", PlayerContainer.players);
            socket.emit("initWalls", World.walls);
            Socketio.emit("playerAdded", player);
        });
        
        socket.on("changeDirection", direction => {
            let player = PlayerContainer.getPlayer(socket.id);
            if (player != null) {
                player.direction = direction; 
            }
            // Socketio.emit("moved", Buffer.from(player.getPlayerPositionData(), 'utf8' ));
        });
    
        socket.on("disconnect", () => {
            console.log('disc');
            PlayerContainer.removePlayer(socket.id)
    
            Socketio.emit("playerRemoved", socket.id);
        })

        //domain events
        domainEvents.on('playerMoved', (playerPositionData) => {
            socket.emit("playerMoved", Buffer.from(playerPositionData, 'utf8' ));
        });
        domainEvents.on('invisConsumed', (id) => {
            socket.emit("invisConsumed", id);
        });
        domainEvents.on('invisExpired', (id) => {
            socket.emit("invisExpired", id);
        });
        domainEvents.on('playerDied', (id) => {
            socket.emit("playerDied", id);
        });
    }
    catch (e) {
        // Socketio.emit("serverError", e.message);
    }
});

Http.listen('3000', () => {
    console.log('listening at :3000...');
});