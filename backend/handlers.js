const { commands } = require('./commands');
const { enviarMensagens } = require('./enviar-mensagens');
//target = canal aonde o bot envia a mensagem
module.exports.onMessageHandler = (client, socket, target, context, msg, self) => {
  // if (self) return; // Ignora para o bot
  // remove o espaço e branco da mensagem
  // console.log({ client, socket, target, context, msg, self });
  //client => client tmi IRC <LIB>
  //socket => socket IO
  //target => nome do canal que está vindo <#canal>
  //msg => apenas mensagens, string
  //self => é bot? bool
  //context=> "#0000FF"
  //https://twitchemotes.com/emotes/425618
  //https://static-cdn.jtvnw.net/emoticons/v1/[ID]/1.0

  const commandName = msg.trim();
  // Se o comando for conhecido, execute
  commands(client, target, commandName);
  enviarMensagens(context, msg, socket);
};

// Called every time the bot connects to Twitch chat
module.exports.onConnectedHandler = (client, addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
  // client.action('#albericod', 'Estou conectado, sou um bot jovem!');
};
