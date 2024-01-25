let listaDeNumerosSorteados = [];
let numeroLimite = 10;

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()* numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return numeroAleatorio();
    } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
    }
}
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,`Brazilian Portuguese Female`,
    {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Digite um número entre 1 e 10.');
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela(`h1`,`Acertou`);
        let palavraTentativas = tentativas > 1 ? `tentativas` :
        `tentativa`;
        let numeroTentativas = `Miseravi! Descobriu com ${tentativas} 
        ${palavraTentativas}`;
        exibirTextoNaTela(`p`, numeroTentativas);
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    }else {
        tentativas++;
        if (chute > numeroSecreto) {
            exibirTextoNaTela(`h1`,`Errou!`);
            exibirTextoNaTela(`p`,`O número secreto é menor!`);
        }else {
            exibirTextoNaTela(`h1`,`Errou!`);
            exibirTextoNaTela(`p`,`O número secreto é maior!`);
        }
        limparCampo();
    }
}
function limparCampo() {
    chute = document.querySelector(`input`);
    chute.value = ``;
}
function reiniciarJogo() {
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById(`reiniciar`).setAttribute(`disabled`,
    true);
}