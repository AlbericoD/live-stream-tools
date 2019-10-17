const PONTOS_INICIAIS = 1000;
let chat = io.connect('http://localhost:8080');
let pontosDeVidaInicial = document.querySelector('.pv-inicial');
let pontosDeVidaAtual = document.querySelector('.pv-atual');
let heroi = document.querySelector('.heroi');
let buttonReset = document.querySelector('.reseta');
let quemCausouDano = document.querySelector('.quem-causou-dano');
let sangue = document.querySelector('.sangue');
let porcentagemDeChanceParaDanoCritico = 0;
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
  { chanceDeCritico: 35, palavra: 'kill', pontos: 1 },
  { chanceDeCritico: 25, palavra: 'LUL', pontos: 2 },
  { chanceDeCritico: 15, palavra: '4Head', pontos: 3 },
  { chanceDeCritico: 10, palavra: '!ban cailir', pontos: 5 },
  { chanceDeCritico: 1, palavra: '!reddit', pontos: 10 }
];

function pesquisaValor(palavra) {
  //pesquisar no array de objetos pontos que a palavra representa
  let valor = palavrasChaves.filter(e => e.palavra === palavra);
  return {
    pontos: valor.length ? valor[0].pontos : 0,
    critico: valor.length ? valor[0].chanceDeCritico : 0
  };
}

const contabilizaPontos = palavras => {
  let somaDospontos = 0;
  let somaDaChanceDeCritico = 0;
  palavras.forEach(palavra => {
    let { pontos, critico } = pesquisaValor(palavra);
    somaDospontos += pontos;
    somaDaChanceDeCritico += critico;
  });
  return { somaDaChanceDeCritico, somaDospontos };
};

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

const diminuiPontos = (nome, quantidade, chanceDeCritico) => {
  if (!quantidade) return;

  porcentagemDeChanceParaDanoCritico += getRandomArbitrary(chanceDeCritico, 100);
  let ehCritico = porcentagemDeChanceParaDanoCritico >= 100;
  if (ehCritico) {
    porcentagemDeChanceParaDanoCritico = 0;
    quantidade *= 2;
    //executar o som de critico aqui
  }

  let pontosAtuais = parseInt(pontosDeVidaAtual.textContent);
  let novosPontos = Math.max(pontosAtuais - quantidade, 0);
  if (!pontosAtuais) return;
  if (!novosPontos) {
    heroi.textContent = `Temos um ganhador! ${nome}`;
    let audio = new Audio('Knockout.mp3');
    // audio.volume()
    audio
      .play()
      .then(e => {
        console.log('teminou de tocar');
      })
      .catch(console.log);
    // sangue.style.width = '0%';
  } else {
    quemCausouDano.textContent = `${nome} causou ${quantidade} de dano ${
      ehCritico ? 'critico' : '!'
    }`;
    quemCausouDano.style.color = ehCritico ? '#00ff00 ' : '#ff0000';
    // let audio = ehCritico ? new Audio('Critico.mp3') : new Audio('Pew.mp3');
    let audio = new Audio(!ehCritico ? 'Critico.mp3' : 'Pew.mp3');
    audio
      .play()
      .then(e => {
        audio.pause()
        console.log('terminou');
      })
      .catch(console.log);
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
  let palavras = verificaPalavraChave(msg);
  let { somaDospontos, somaDaChanceDeCritico } = contabilizaPontos(palavras);
  diminuiPontos(nome, somaDospontos, somaDaChanceDeCritico);
});

/**
 *
 * andom de 0 até 25 chance de critico por palavra escrita = retorno do random while funcao ativa if chance de critico por palavra >= 100 critico else chance de critico por palavra = retorno do random ++
 * 
 * EliveltonSVR: @luambo1 tinha mandado esse https://www.youtube.com/watch?v=z43hHLsKqaA
Twitch PrimeEliveltonSVR: kk
Twitch PrimeEliveltonSVR: Som pra por quando a vida for == 0 https://www.youtube.com/watch?v=XEm-anELm10
 * */
