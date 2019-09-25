const io = require('socket.io')(8080);
const tmi = require('tmi.js');
//configurações
const { opts } = require('./config');
const clientTMI = new tmi.client(opts);
//fim configurações

const { onConnectedHandler, onMessageHandler } = require('./handlers');

io.on('connection', function(socket) {
  console.log('socket conectado, esperando mensagens!');
  // transmitir-mensagens-do-chat-twitch
  //TODO: EMITIR PELO EVENTOS
  //ESCUTADOR DE EVENTOS DO CHAT TWITCH

  // Registra os manipuladores de eventos

  clientTMI.on('message', onMessageHandler.bind(null, clientTMI, socket));
  clientTMI.on('connected', onConnectedHandler.bind(null, clientTMI));
  // Connectar na Twitch:
  clientTMI.connect();
});
