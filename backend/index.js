require('dotenv').config();
const { opts, PORT } = require('./config');
const io = require('socket.io')(PORT);
const tmi = require('tmi.js');
const clientTMI = new tmi.client(opts);
const { onConnectedHandler, onMessageHandler } = require('./handlers');
const express = require("express");
const app = express();
const fs = require("fs");

const expressPort = process.env.EXPRESSPORT;

let uniqueSocket = false;

const adicionarEscutadoresAoChat = (client, socket) => {
  client.on('message', onMessageHandler.bind(null, client, socket));
  client.on('connected', onConnectedHandler.bind(null, client));
};

const conectarNoChatDaTwitch = async socket => {
  try {
    // await clientTMI.disconnect();
    adicionarEscutadoresAoChat(clientTMI, socket);
    await clientTMI.connect();
  } catch (error) {
    console.error('deu ruim aqui no chat da twitch man :s');
  }
};

io.on('connection', socket => {
  if (!socket) uniqueSocket = true;
  console.log('socket conectado, esperando mensagens!');
  conectarNoChatDaTwitch(socket);
});

//Express
fs.readdir("../frontend", (err, folders) => {
  console.log("Arquivos principais expostos:");
  folders.forEach(folder => {
    console.log(` ${folder} - http://localhost:${expressPort}/${folder}/index.html`)
    app.use(`/${folder}`, express.static(`../frontend/${folder}/`));
  })
})

app.listen(expressPort, () => {
  console.log(`Express agora está expondo a porta HTTP ${expressPort}`);
})
