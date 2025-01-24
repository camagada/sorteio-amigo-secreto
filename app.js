let amigos = [];
let amigosSorteados = [];

// Adicionar com Enter
function onKeyDown(event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
}

function limpaCampoID(id){
    document.getElementById(id).value = '';
}

function focusInput(id) {
    var inputElement = document.getElementById(id);

    // Verifica se o elemento foi encontrado antes de tentar coloca-lo em foco
    if (inputElement) {
        // Coloca o foco no elemento
        inputElement.focus();
    } else {
        console.error(`Elemento com ID ${id} não encontrado.`);
    }
}

function novoSorteio(){
    limpaCampoID('amigo');
    amigos = [];
    amigosSorteados = [];
    let txtLista = document.getElementById('listaAmigos');
    txtLista.innerHTML = '';
    let txtSorteado = document.getElementById('resultado');
    txtSorteado.innerHTML = '';

    focusInput('amigo');

//    console.log('btnNovoSorteio(clicado)');
}

function listaAmigos(){
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = amigos;

    // log
//   console.log('FlistaAmigos() = '+ amigos);
}

function adicionarAmigo(){
    let nome = document.querySelector('input').value;
 //   console.log('FadicionarAmigo() = ' + nome);
    
    if(nome == ''){
        alert('Por favor, insira um nome.');
    }else{
        amigos.push(nome);
        listaAmigos();
        limpaCampoID('amigo');
//        console.log('FadicionarAmigo(qtdAmigos) = ' + qtdAmigos);
    }
}

function resultadoSorteio(idSorteado){

    let nomeSorteado = amigos[idSorteado];

    let exibirSorteado = document.getElementById('resultado');
    let mensagemResultado = "O sorteado foi: " + nomeSorteado; 
    
    exibirSorteado.innerHTML = mensagemResultado;

    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(mensagemResultado);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    }
    
    // log
//    console.log('FresultadoSorteio(sorteado) = ' + nomeSorteado);
}

function sortearAmigo(){
    if(amigos.length >= 2){
        let listaAmigosQtd = amigos.length;
        let numeroAleatorio = Math.floor(Math.random() * amigos.length);

        //verifico se foi sorteado todos os nomes
        if(amigos.length != amigosSorteados.length){
            while (amigosSorteados.includes(numeroAleatorio)) {
                numeroAleatorio = Math.floor(Math.random() * amigos.length);
            } 

            amigosSorteados.push(numeroAleatorio);
        
            resultadoSorteio(numeroAleatorio);
    
            //console.log('FsortearAmigo(qtd_amigos) = ' + listaAmigosQtd);
            //console.log('FsortearAmigo(numeroAleatorio) = ' + numeroAleatorio);
        }else {
            alert('Todos os amigos foram sorteados');
        }
    }else{
        alert('Para sortear, adicionar ao menos 2 amigos!');
        focusInput('amigo');
        //console.log('FsortearAmigo() = ao menos 2 amigos para sortear');
    }
}

// Ao iniciar, foca no input
focusInput('amigo');