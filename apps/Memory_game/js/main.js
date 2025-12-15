// Selectors
const elements = {
    blockContainer: document.querySelector('.memory-game-blocks'),
    blocks: Array.from(document.querySelector('.memory-game-blocks').children),
    infoName: document.querySelector('.name span'),
    scoreFeild: document.querySelector('.score span'),
    infoCount: document.querySelector('.count'),
    splashScreen: document.querySelector('.button span'),
    timerDiv: document.querySelector('.timer'),
    alertBox: document.querySelector('.alert'),
    alertOk: document.querySelector('.ok'),
    sndLose: document.querySelector('.snd-lose'),
    sndWin: document.querySelector('.snd-win'),
    sndSplash: document.querySelector('.snd-splash'),
    sndPlayGround: document.querySelector('.snd-play'),
    sndGameOver: document.querySelector('.snd-go'),
    sndButton: document.querySelector('.snd-button')

};

// Variables
let playerName = localStorage.getItem('playerName') || 'Unknown';
let gameTimer = parseInt(localStorage.getItem('timer')) || 60;
let triesCount = parseInt(localStorage.getItem('tries-number')) || 10;

// Set Initial UI Values
elements.infoName.innerHTML = playerName;
elements.infoCount.innerHTML = triesCount;
elements.blocks.forEach((block) => {
    block.addEventListener("click", () => {
        elements.sndButton.play();
    });
})
// Shuffle Function
function shuffleArray(array) {
    let currentIndex = array.length;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Initialize Game
function initializeGame() {
    let shuffledOrder = shuffleArray([...Array(elements.blocks.length).keys()]);
    elements.blocks.forEach((block, index) => {
        block.style.order = shuffledOrder[index];
        block.addEventListener('click', handleBlockClick);
    });
}

// Handle Block Click
function handleBlockClick() {
    this.classList.add('is-flipped');
    let flippedBlocks = document.querySelectorAll('.is-flipped');
    if (flippedBlocks.length === 2) {
        elements.blockContainer.classList.add('stop-clicking');
        setTimeout(() => {
            elements.blockContainer.classList.remove('stop-clicking');
            checkMatch(flippedBlocks[0], flippedBlocks[1]);
        }, 1000);
    }
}

// Check Match Function
function checkMatch(firstBlock, secondBlock) {
    if (firstBlock.dataset.gun === secondBlock.dataset.gun) {
        markAsMatched(firstBlock, secondBlock);
    } else {
        decreaseTries();
        unflipBlocks(firstBlock, secondBlock);
        elements.sndLose.play();

    }
}

// Mark Matched Blocks
function markAsMatched(firstBlock, secondBlock) {
    firstBlock.classList.add('is-matched');
    secondBlock.classList.add('is-matched');
	var score = countScore(elements.blocks);
    elements.sndWin.play();
	elements.scoreFeild.innerHTML = score;
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
}

// Unflip Non-Matching Blocks
function unflipBlocks(firstBlock, secondBlock) {
    setTimeout(() => {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
    }, 100);
}

// Decrease Tries
function decreaseTries() {
    triesCount--;
    elements.infoCount.innerHTML = triesCount;
    if (triesCount === 0) {
        endGame(`Game Over :( Your Score is ${countScore(elements.blocks)}`);
        elements.sndGameOver.play();
    };
}

// End Game
function endGame(message) {
    document.querySelector('.snd-go').play();
    alertWindow(message);
    elements.blockContainer.classList.add('stop-clicking');
    document.querySelector('.ok').addEventListener('click', () => location.reload());
}

// Timer Function
function timer(time) {
    let timerInterval = setInterval(() => {
        time--;
        elements.timerDiv.innerHTML = time;

        if (time <= 10) document.querySelector('.fa-clock').style.color = 'red';
        if (time === 0) {
            clearInterval(timerInterval);
            endGame(`Time out! :( Your Score is ${countScore(elements.blocks)}`);
        }
    }, 999);
}

// Display Alert
function alertWindow(msg) {
    $('.alert p').text(msg);
    $(".alert").slideToggle(300);
    $('.ok').click(() => $('.alert').hide(100));
}

// Save Name to Local Storage
function saveNameInLocalStorage(name) {
    localStorage.setItem('playerName', name);
}

// Start Game Event Listener
elements.splashScreen.addEventListener('click', () => {
    elements.sndSplash.play();
    let nameUser = prompt('Enter Your Name', '...');
    playerName = nameUser || 'Unknown';
    elements.infoName.innerHTML = playerName;
    saveNameInLocalStorage(playerName);
    elements.splashScreen.parentElement.remove();
    timer(gameTimer);
    initializeGame();
});

// Settings
$('.settings i').click(() => $('.settings-container').slideToggle(400));
document.querySelector('.save-data').addEventListener('click', saveData);

// Save Data
function saveData() {
    let timerValue = parseInt(document.querySelector('#timer-number').value);
    localStorage.setItem('timer', timerValue);

    let triesCount = document.querySelector('#tries-number');
    localStorage.setItem('tries-number', parseInt(triesCount.value));

    let colorBlocks = document.querySelector('#color').value;
    elements.blocks.forEach(block => block.style.backgroundColor = colorBlocks);
    localStorage.setItem('colorBlocks', colorBlocks);
    $('.settings-container').slideToggle(100);
    elements.sndButton.play();
    location.reload();
}

// Apply Saved Settings on Load
document.addEventListener('DOMContentLoaded', () => {
    let savedColor = localStorage.getItem('colorBlocks');
    if (savedColor) {
        elements.blocks.forEach(block => block.style.backgroundColor = savedColor);
    }
    let saverTriesNumber = localStorage.getItem('tries-number');
    if(saverTriesNumber) {
        elements.infoCount.innerHTML = parseInt(saverTriesNumber);
    }
    console.log(typeof parseInt(saverTriesNumber))
});
function countScore(Blocks) {
	var result = 0;
	Blocks.forEach((block) => {
		if(block.classList.contains("is-matched")) {
			result = result + Number(block.dataset.score)
		}
	});
	return result / 2;
}