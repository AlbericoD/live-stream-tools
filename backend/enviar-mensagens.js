module.exports.enviarMensagens = ({ color, badges, subscriber, emotes, ...props }, msg, socket) => {
  const mensagem = {
    nome: props['display-name'],
    color,
    badges,
    subscriber,
    emotes,
    msg
  };
  console.log('MENSAGEM QUE CHEGOU DA TWITCH =>: ', msg);
  socket.emit('message', mensagem);
};
