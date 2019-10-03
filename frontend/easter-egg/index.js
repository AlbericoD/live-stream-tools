let chat = io.connect('http://localhost:8080');
let pontosDeVida = document.querySelector('#pontos-de-vida');
pontosDeVida.textContent = 50;

const palavrasChaves = [{ palavra: 'kill', pontos: 1, palavra: 'LUL', pontos: 5 }];

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

const diminuiPontos = quantidade => {
  if (!quantidade) return;
  let pontosAtuais = parseInt(pontosDeVida.textContent);
  pontosDeVida.textContent = pontosAtuais - quantidade;
};

const verificaPalavraChave = mensagem => {
  let palavrasEncontradas = [];
  //preciso alterar a forma de verificar ocorrencia de palavras, pq a estrutura mudou
  palavrasChaves.forEach(palavra => {
    let ocorrencias = mensagem.match(new RegExp(palavra, 'g'));
    if (ocorrencias !== null) palavrasEncontradas.push(...ocorrencias);
  });
  return palavrasEncontradas;
};

chat.on('message', mensagemBruta => {
  console.log({ mensagemBruta });
  let palavras = verificaPalavraChave(mensagemBruta.msg);
  let pontos = contabilizaPontos(palavras);
  diminuiPontos(pontos);
});
