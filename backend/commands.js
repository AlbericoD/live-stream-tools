const { rollDice, fliston } = require('./skills');

module.exports.commands = (client, target, commandName) => {
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
    //socket, mandar essas mensagens
  }
  if (commandName === '!flinston') {
    client.say(target, fliston());
  }
};
