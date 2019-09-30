//cliente escutando as mensagens do socket io
const QDT_MAXIMA_DE_MENSAGENS = 5;
let chat = io.connect('http://localhost:8080');
let containerDoChat = document.querySelector('.chat');
let mensagens = [];

const templatesBadges = () =>
  `<img src="https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1" >`;

const templateMensagem = ({ badge, nome, color, msg }) =>
  `<div class="container-mensagem">
  <span class="badge">${templatesBadges(badge)}</span>
    <span class="nome-espectador" style="color:${color}" >${nome}</span><span class="doispontos">:</span>&nbsp;
    <p class="mensagem">${msg}</p>
  </div>`;

const inserirMensagem = conteudo => {
  let mensagem = templateMensagem(conteudo);
  mensagens.push(mensagem);
  if (mensagens.length > QDT_MAXIMA_DE_MENSAGENS) mensagens.shift();
};

const renderizarMensagens = mensagens => {
  containerDoChat.innerHTML = '';
  mensagens.forEach(mensagem => (containerDoChat.innerHTML += mensagem));
};

chat.on('message', mensagemBruta => {
  console.log({ mensagemBruta });
  inserirMensagem(mensagemBruta);
  renderizarMensagens(mensagens);
});
