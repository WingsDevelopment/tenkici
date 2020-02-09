const Express = require('express')();
const Http = require('http').Server(Express);
const Socketio = require('socket.io')(Http);
const PlayerContainer = require('./playerFiles/PlayerContainer.js');
const PlayerType = require('./playerFiles/PlayerType.js');
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
            if (player == null) {
                if (playerType === PlayerType.Vampire){
                    socket.emit("serverError", 'Object reference is not ne loziii se, ima previse vampira, probaj ko ljakse :)');
                }
                else {
                    socket.emit("serverError", 'Probaj posle');
                }
            }
            else {
                socket.emit("join", player);
                socket.emit("initOthers", PlayerContainer.players);
                socket.emit("initWalls", World.walls);
                socket.emit("initInvises", PlayerContainer.invisRunes);
                Socketio.emit("playerAdded", player);
            }
        });
        
        socket.on("changeDirection", direction => {
            let player = PlayerContainer.getPlayer(socket.id);
            if (player != null) {
                player.direction = direction; 
            }
        });
    
        socket.on("disconnect", () => {
            console.log('disc');
            PlayerContainer.removePlayer(socket.id)
    
            Socketio.emit("playerRemoved", socket.id);
        })

        socket.on("consumeInvis", () => {
            PlayerContainer.playerIdsForInvisRequests.push(socket.id);
        })

        //domain events
        domainEvents.on('playerMoved', (player) => {
            let thisPlayer = PlayerContainer.getPlayer(socket.id);
            if (thisPlayer == null) return;

            if (thisPlayer.playerType === PlayerType.Vampire) {
                if (!player.isInvisible) {
                    socket.emit("playerMoved", Buffer.from(player.getPlayerPositionData(), 'utf8' ));
                }
            } else {
                socket.emit("playerMoved", Buffer.from(player.getPlayerPositionData(), 'utf8' ));
            }
        });
        domainEvents.on('invisSpawned', (invis) => {
            socket.emit("invisSpawned", invis);
        });
        domainEvents.on('invisConsumed', (playerId) => {
            socket.emit("invisConsumed", playerId);
        });
        domainEvents.on('deleteInvisesFromMap', (ids) => {
            socket.emit("deleteInvisesFromMap", ids);
        });
        domainEvents.on('invisExpired', (playerId) => {
            let player = PlayerContainer.getPlayer(playerId);
            if (player == null) return;
            socket.emit("invisExpired", player.getPlayerPositionData());
        });
        domainEvents.on('playerDied', (id) => {
            socket.emit("playerDied", id);
        });
    }
    catch (e) {
        console.log('a?0');
        // Socketio.emit("serverError", e.message);
    }
});

Http.listen('3000', () => {
    console.log('listening at :3000...');
});
