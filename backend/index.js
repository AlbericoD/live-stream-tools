const tmi = require('tmi.js');
const { opts } = require('./config');

const client = new tmi.client(opts);
const { onConnectedHandler, onMessageHandler } = require('./handlers');

// Registra os manipuladores de eventos
client.on('message', onMessageHandler.bind(null, client));
client.on('connected', onConnectedHandler.bind(null, client));
// Connect to Twitch:
client.connect();
