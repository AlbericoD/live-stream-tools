const { commands } = require('./commands');
//target = canal aonde o bot envia a mensagem
module.exports.onMessageHandler = (client, socket, target, context, msg, self) => {
  // if (self) return; // Ignora para o bot
  // remove o espaço e branco da mensagem
  const commandName = msg.trim();
  // Se o comando for conhecido, execute
  commands(client, target, commandName, socket);
};

// Called every time the bot connects to Twitch chat
module.exports.onConnectedHandler = (client, addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
  // client.action('#albericod', 'Estou conectado, sou um bot jovem!');
};
