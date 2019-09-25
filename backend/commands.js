const skill = require('./skills');
//Todo, se conseguir eliminar o prefixo '!', dai fica bonito
const commands = [
  {
    name: '!dice',
    action: skill.rollDice
  },
  {
    name: '!fliston',
    action: skill.fliston
  },
  {
    name: '!bobo',
    action: skill.bobo
  },
  {
    name: '!pjl',
    action: skill.pjl
  }
];

module.exports.commands = (client, target, mensagem, socket) => {
  //verificar se  tem prefixo '!'
  console.log('MENSAGEM QUE CHEGOU DA TWITCH =>: ', mensagem);
  // console.log(socket);
  socket.emit('message', mensagem);
  // propagarChatTwitch.addListener('chat-twitch', mensagem);
  // socket.emit('message', commandName);
  //EMITIR => ESCUTADOR DE EVENTOS DO CHAT TWITCH
  commands.forEach(command => {
    if (mensagem === command.name) client.say(target, `${command.action()}`);
  });
};
