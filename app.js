// app.js
let listaDeNumerosSorteados = [];
let numeroLimite = 10; // Limite máximo do número secreto
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNatela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {
        pitch: 1,
        rate: 1.2,
        volume: 1
    });
}

function exibirMensagemInicial() {
    exibirTextoNatela('h1', 'Adivinhe o número');
    exibirTextoNatela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNatela('h1', 'Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = 'Você acertou o número secreto em ' + tentativas + ' ' + palavraTentativa + '!';
        exibirTextoNatela('p', 'O número secreto era ' + numeroSecreto + '. ' + mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNatela('p', 'O número secreto é menor que ' + chute);
        } else {
            exibirTextoNatela('p', 'O número secreto é maior que ' + chute);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let nummeroEscolhido = parseInt(Math.random() * 10 + 1);
    let quantidadeNumerosSorteados = listaDeNumerosSorteados.length;
    if (quantidadeNumerosSorteados >= 10) {
        listaDeNumerosSorteados = [];
        console.log('Lista de números sorteados foi reiniciada.');
    }
    if (listaDeNumerosSorteados.includes(nummeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(nummeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return nummeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';

}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', 'disabled');
    limparCampo();
}
