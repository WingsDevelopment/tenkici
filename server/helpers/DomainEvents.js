const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const domainEvents = new MyEmitter();

module.exports = domainEvents;