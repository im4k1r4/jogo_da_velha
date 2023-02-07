// Initial Data:
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let playerTurn ='';
let warning = '';
let playing = false;

reset ();

// Events:
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})

// Functions:

function itemClick(event) { 
    let item = event.target.getAttribute('data-item'); // identifica qual item está sendo clicado
    if(playing && square[item] === '') { // se o quadrado estiver vazio e o jogo estiver rolando
        square[item] = player; // preenche o square item com o jogador da vez
        renderSquare(); // função para renderizar as informações
        togglePlayer(); // função pra alternar o jogador
    }
}

function reset() { // resetar as infos
    warning = '';

    let random = Math.floor(Math.random() * 2); //número aleatório entre 0 e 1. Mathfloor arredonda pra baixo.
    player = (random === 0) ? 'x' : 'o'; // se for igual a 0 é x, senão o

    for(let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() { // preencher o quadro
    for(let i in square) { // percorre o quadro e vê se tem algo preenchido e se tiver coloca no HTML
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame(); // verificar se alguém ganhou o jogo
}

function renderInfo () { // preencher as infos abaixo
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x'; // se o player for x coloca o senão coloca x
    renderInfo(); // mostrar as infos do novo player nos avisos
}

function checkGame() {
    if(checkWinnerFor('x')) { // verificar se o x venceu
        warning = 'O "x" venceu';
        playing = false; // pausar o jogo
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()) { // verificar se está tudo preenchido
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player) {
    let possibilidades = [ // possibilidades de vitória
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in possibilidades) {
        let pArray = possibilidades[w].split(','); // pega cada linha do array e dá um split na virgula
        let hasWon = pArray.every((option) =>{ // percorrer o array e armazenar em hasWon
            if (square[option] === player) { // se toda a condição for satisfeita (option vai ser a1, a2, a3 por exemplo, se for preenchida com o player (x ou o))
                return true
            } else {
            return false;
            }
        });
        if(hasWon) {
            return true;
        }
    }
    return false; // significa que esse jogador não venceu, então ele vai para o próximo
}

function isFull() {
    for(let i in square) {
        if(square[i] ==='') { // se estiver algum quadro vazio
            return false; // retorna falso
        }
    }

    return true;
}