const Express = require('express')();
const Http = require('http').Server(Express);
const Socketio = require('socket.io')(Http);

var players = [];

var positions = [
    {
        x: 100,
        y: 100
    },
    {
        x: 200,
        y: 200
    },
    {
        x: 300,
        y: 300
    }
]

Socketio.on("connection", socket => {
    players.push({position: positions[players.length - 1]});
    socket.emit("position", players[players.length - 1].position);
});

Http.listen('3000', () => {
    console.log('listening at :3000...');
});