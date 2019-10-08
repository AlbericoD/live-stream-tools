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
  },
  {
    name: '!java',
    action: skill.java
  }
];

module.exports.commands = (client, target, mensagem) => {
  commands.forEach(command => {
    if (mensagem === command.name) client.say(target, `${command.action()}`);
  });
};
