let titulo = document.querySelector('.titulo');
titulo.style.color = 'white';

//cliente escutando as mensagens do socket io
let chat = io.connect('http://localhost:8080');

//selecionar o container do chat
let chat = document.querySelector('.chat');

//criar um elemento  <p class="mensagens"></p>, dica alexandreramosbr: document.createElement("p")

//mensagens do chat twitch
//TODO: mensangens triplicadas!
chat.on('connect', function() {
  console.log('pronto para enviar mensagem!');

  chat.on('message', message => {
    console.log({ message });
    //append elmento no chat
  });
});
