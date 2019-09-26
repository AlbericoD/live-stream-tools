const { opts, PORT } = require('./config');
const io = require('socket.io')(PORT);
const tmi = require('tmi.js');
const clientTMI = new tmi.client(opts);

const { onConnectedHandler, onMessageHandler } = require('./handlers');

const conectarNoChatDaTwitch = socket => {
  clientTMI.on('message', onMessageHandler.bind(null, clientTMI, socket));
  clientTMI.on('connected', onConnectedHandler.bind(null, clientTMI));
  clientTMI.connect();
};

io.on('connection', socket => {
  console.log('socket conectado, esperando mensagens!');
  conectarNoChatDaTwitch(socket);
});
