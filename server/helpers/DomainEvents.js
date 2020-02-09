const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const domainEvents = new MyEmitter();

domainEvents.setMaxListeners(10000);

module.exports = domainEvents;