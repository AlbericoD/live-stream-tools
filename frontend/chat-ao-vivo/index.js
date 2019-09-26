let titulo = document.querySelector('.titulo');
titulo.style.color = 'white';

//cliente escutando as mensagens do socket io
let chat = io.connect('http://localhost:8080');

//selecionar o container do chat
let containerChat = document.querySelector('.chat');
let elementosNoChat = document.querySelectorAll('.chat');

//https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib
const verificarTamanhoDocontainer = () => {
  if (elementosNoChat[0].children.length >= 5) {
    let primeiroElemento = elementosNoChat[0].firstElementChild();
    elementosNoChat.removeChild(primeiroElemento);
    //aqui acontece a verificação do container de mensagens
  }
};

const criaElementoMensagem = conteudo => {
  let paragrafo = document.createElement('p');
  paragrafo.style.color = 'orange';
  paragrafo.textContent = conteudo;
  return paragrafo;
};

// cailir: Voce pode fazer uma array, ai a cada mensagem voce da push() nesssa mensagem e da um shift() se for mais de 5 o size da array, então quando ele atualizar voce atualiza o site com um for, será q n seria uma boa ideia?
// let elementoMensagens = {};

// for (let index = 0; index < 5; index++) {
//   elementoMensagens[index] = document.querySelector(`.mensagem-${index}`);
// }

let mensagens = []; //Voce pode fazer uma array
chat.on('message', mensagemBruta => {
  mensagens.push(mensagemBruta);
  if (mensagens.length > 5) mensagens.shift();
  for (let i = 0; i < 5; i++) {
    let el = document.querySelector(`.mensagem-${i + 1}`);
    el.textContent = mensagens[i];
    el.style.color = 'white';
  }
});

// chat.on('message', mensagemBruta => {
//   if (mensagens.length > 5) mensagens.shift(); //e da um shift() se for mais de 5 o size da array
//   mensagens.push(mensagemBruta); //a cada mensagem voce da push() nesssa mensagem
//   mensagens.forEach((mensagem, posicao) => {
//     elementoMensagens[posicao].textContent = mensagem;
//   });

//   // verificarTamanhoDocontainer();

//   let elementoMensagem = criaElementoMensagem(mensagemBruta); //isso aqui tem que acontecer
//   containerChat.appendChild(elementoMensagem);
//   console.log({ message });
// });
