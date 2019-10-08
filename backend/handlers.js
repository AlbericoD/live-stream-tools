const { commands } = require('./commands');
const { enviarMensagens } = require('./enviar-mensagens');
//target = canal aonde o bot envia a mensagem
module.exports.onMessageHandler = (client, socket, target, context, msg, self) => {
  const commandName = msg.trim();
  commands(client, target, commandName);
  enviarMensagens(context, msg, socket);
};

// Called every time the bot connects to Twitch chat
module.exports.onConnectedHandler = (client, addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
  // client.action('#albericod', 'Estou conectado, sou um bot jovem!');
};
