const PONTOS_INICIAIS = 20;
let chat = io.connect('http://localhost:8080');
let pontosDeVida = document.querySelector('#pontos-de-vida');
let heroi = document.querySelector('.heroi');
let buttonReset = document.querySelector('.reseta');
let quemCausouDano = document.querySelector('.quem-causou-dano');

pontosDeVida.textContent = PONTOS_INICIAIS;

buttonReset.addEventListener('click', e => {
  e.preventDefault();
  pontosDeVida.textContent = PONTOS_INICIAIS;
  heroi.textContent = '';
});

const palavrasChaves = [
  { palavra: 'kill', pontos: 1 },
  { palavra: 'LUL', pontos: 5 },
  { palavra: '4Head', pontos: 8 },
  { palavra: '!ban cailir', pontos: 15 }
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
  let pontosAtuais = parseInt(pontosDeVida.textContent);
  let novosPontos = Math.max(pontosAtuais - quantidade, 0);
  //aqui vou ter que identificar quem foi a pessoa que zerou os pontos de vida
  if (!pontosAtuais) return;
  if (!novosPontos) {
    heroi.textContent = `Temos um ganhador! ${nome}`;
  } else {
    quemCausouDano.textContent = `${nome} causou dano!`;
    setTimeout(() => {
      quemCausouDano.textContent = '';
    }, 2000);
  }
  pontosDeVida.textContent = novosPontos;
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
