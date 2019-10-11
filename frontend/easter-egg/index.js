const PONTOS_INICIAIS = 1000;
let chat = io.connect('http://localhost:8080');
let pontosDeVidaInicial = document.querySelector('.pv-inicial');
let pontosDeVidaAtual = document.querySelector('.pv-atual');
let heroi = document.querySelector('.heroi');
let buttonReset = document.querySelector('.reseta');
let quemCausouDano = document.querySelector('.quem-causou-dano');
let sangue = document.querySelector('.sangue');
const desafiosData = JSON.parse(data);
// console.log(desafiosData);
// // debugger;

sangue.style.width = '100%';
pontosDeVidaInicial.textContent = PONTOS_INICIAIS;
pontosDeVidaAtual.textContent = PONTOS_INICIAIS;

// buttonReset.addEventListener('click', e => {
//   e.preventDefault();
//   pontosDeVidaAtual.textContent = PONTOS_INICIAIS;
//   heroi.textContent = '';
//   sangue.style.width = '100%';
// });

const palavrasChaves = [
  { palavra: 'kill', pontos: 1 },
  { palavra: 'LUL', pontos: 5 },
  { palavra: '4Head', pontos: 8 },
  { palavra: '!ban cailir', pontos: 15 },
  { palavra: '!reddit', pontos: 989 }
];

function pesquisaValor(palavra) {
  //pesquisar no array de objetos pontos que a palavra representa
  let valor = palavrasChaves.filter(e => e.palavra === palavra);
  return valor.length ? valor[0].pontos : 0;
}
const contabilizaPontos = palavras => {
  let pontos = 0;
  palavras.forEach(palavra => {
    pontos += pesquisaValor(palavra);
  });
  return pontos;
};

const diminuiPontos = (nome, quantidade) => {
  if (!quantidade) return;
  let pontosAtuais = parseInt(pontosDeVidaAtual.textContent);
  let novosPontos = Math.max(pontosAtuais - quantidade, 0);
  //aqui vou ter que identificar quem foi a pessoa que zerou os pontos de vida
  if (!pontosAtuais) return;
  if (!novosPontos) {
    heroi.textContent = `Temos um ganhador! ${nome}`;
    let audio = new Audio('Knockout.mp3');
    // audio.volume()
    audio.play();
    // sangue.style.width = '0%';
  } else {
    quemCausouDano.textContent = `${nome} causou ${quantidade} de dano!`;
    let audio = new Audio('Pew.mp3');
    audio.play();
    setTimeout(() => {
      quemCausouDano.textContent = '';
    }, 2000);
  }

  let pvInicial = parseInt(pontosDeVidaInicial.textContent);
  let porcentagemAtual = parseInt(sangue.style.width);
  let porcentagemCausada = (quantidade / pvInicial) * 100;
  sangue.style.width = `${porcentagemAtual - porcentagemCausada}%`;
  pontosDeVidaAtual.textContent = novosPontos;
};

const verificaPalavraChave = mensagem => {
  let palavrasEncontradas = [];
  //preciso alterar a forma de verificar ocorrencia de palavras, pq a estrutura mudou
  palavrasChaves.forEach(palavraChave => {
    let ocorrencias = mensagem.match(new RegExp(palavraChave.palavra, 'g'));
    if (ocorrencias !== null) palavrasEncontradas.push(...ocorrencias);
  });
  return palavrasEncontradas;
};

chat.on('message', ({ msg, nome, ...mensagemBruta }) => {
  // console.log({ mensagemBruta });
  let palavras = verificaPalavraChave(msg);
  let pontos = contabilizaPontos(palavras);
  diminuiPontos(nome, pontos);
});
