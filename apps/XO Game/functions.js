var turn = "x";
var title = document.querySelector('.title');
var square = [];
var time = 3;

function winner(){
    
    for(let k = 1; k < 10; k++) {
        square[k] = document.getElementById('block' + k).innerHTML;
    }
    
    if(square[1] == square[2] && square[2] == square[3] && square[3] != '') {
        endGame(1, 2, 3);
    }
    if(square[4] == square[5] && square[5] == square[6] && square[6] != '') {
        endGame(4, 5, 6);
    }
    if(square[7] == square[8] && square[8] == square[9] && square[9] != '') {
        endGame(7, 8, 9);
    }
    if(square[1] == square[5] && square[5] == square[9] && square[9] != '') {
        endGame(1, 5, 9);
    }
    if(square[3] == square[5] && square[5] == square[7] && square[7] != '') {
        endGame(3, 5, 7);
    }
    if(square[1] == square[4] && square[4] == square[7] && square[7] != '') {
        endGame(1, 4, 7);
    }
    if(square[2] == square[5] && square[5] == square[8] && square[8] != '') {
        endGame(2, 5, 8);
    }
    if(square[3] == square[6] && square[6] == square[9] && square[9] != '') {
        endGame(3, 6, 9);
    }
}

function endGame(x, y, z) {
    document.querySelector('.st').innerHTML = turn + " is Winner! :) <br>";

    document.getElementById('block' + x).classList.add('active');
    document.getElementById('block' + y).classList.add('active');
    document.getElementById('block' + z).classList.add('active');
    document.querySelector('.blocks').classList.add('disable');

    setInterval(() => {
        title.innerHTML = 'Reload Game after => ' + time--;
    }, 1000)

    setTimeout(() => {
        window.location.reload();
    }, 3400);
}

function game(id) {
    var block = document.getElementById(id);
    if(turn == "x" && block.innerHTML == '') {
        block.innerHTML = turn;
        winner();
        turn = "o";
        title.innerHTML = `Role of the Player: ${turn}`;
    } else if(turn == "o" && block.innerHTML == '') {
        block.innerHTML = turn;
        winner();
        turn = "x";
        title.innerHTML = `Role of the Player: ${turn}`;
    }
}