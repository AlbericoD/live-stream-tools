//cliente escutando as mensagens do socket io
let chat = io.connect('http://localhost:8080');

let mensagens = [];

const inserirMensagem = conteudo => {
  mensagens.push(conteudo);
  if (mensagens.length > 5) mensagens.shift();
};

const ordernarMensagens = () => {
  for (let index = 0; index < 5; index++) {
    let conteudoMensagem = document.querySelector(`.mensagem-${index + 1}`);
    conteudoMensagem.textContent = mensagens[index].msg;
    conteudoMensagem.style.color = 'white';

    let badgeEspectador = document.querySelector(`.badge-${index + 1}`);
    let nomeEspectador = document.querySelector(`.nome-${index + 1}`);

    nomeEspectador.textContent = mensagens[index].nome;
    nomeEspectador.style.color = mensagens[index].color;

    nomeEspectador.style.fontWeight = 700;
  }
};

chat.on('message', mensagemBruta => {
  console.log({ mensagemBruta });
  inserirMensagem(mensagemBruta);
  ordernarMensagens();
});
