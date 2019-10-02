//cliente escutando as mensagens do socket io
const QDT_MAXIMA_DE_MENSAGENS = 12;
let chat = io.connect('http://localhost:8080');
let containerDoChat = document.querySelector('.chat');
let mensagens = [];
const badgesDB = { ...JSON.parse(dataBadges)[0].badge_sets }; //json vem do assets

const templatesBadges = badge => {
  if (!badge) return '';
  let badges = '';
  let propiedades = Object.keys(badge);

  propiedades.forEach(propiedade => {
    let url = badgesDB[propiedade].versions['1'].image_url_1x;
    badges += `<img src=${url} >`;
  });
  return badges;
};

const ehPLayerDeLOL = nome =>
  nome === 'ana_geek' || nome === 'kiresm17' || nome === 'gedes' || nome === 'x_mahiru'
    ? `FALA TU ${nome}`
    : nome;

const verificaCorDoNome = cor => (!cor ? 'white' : cor);

const substituiEmotes = (mensagem, emotes) => {
  if (emotes === null) return mensagem;
  let propiedades = Object.keys(emotes);

  propiedades.forEach(propiedade => {
    let url = `<img class="emote" src=https://static-cdn.jtvnw.net/emoticons/v1/${propiedade}/1.0>`;
    let posicaoDoEmote = emotes[propiedade][0];

    let posicoes = posicaoDoEmote.split('-').map(posicao => parseInt(posicao));
    let nomeDoEmote = mensagem.substring(posicoes[0], posicoes[1] + 1);
    mensagem = mensagem.replace(new RegExp(nomeDoEmote, 'g'), url);
  });
  return mensagem;
};

const templateMensagem = ({ badges, nome, color, msg, emotes }) =>
  `<div class="container-mensagem">
      <span class="badge">${templatesBadges(badges)}</span>
      <span class="nome-espectador" style="color:${verificaCorDoNome(color)}" >${ehPLayerDeLOL(
    nome
  )}</span><span class="doispontos">:</span>
      <span class="mensagem">${substituiEmotes(msg, emotes)}</span>  
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
  inserirMensagem(mensagemBruta);
  renderizarMensagens(mensagens);
});
