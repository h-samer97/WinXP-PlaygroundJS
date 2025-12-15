class Game {

    constructor() {
        this.letters = 'abcdefghijklmnopqrstuvwxyz';
        this.lettersArray = Array.from(this.letters);
        this.lettersContainer = document.querySelector('.letters');

        this.words = {
            programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
            movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
            people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
            countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
        }

        this.value = null;

        this.init();
    }
    
    init() {
        this.generateLetters(this.lettersArray);
        this.getRandomProperty();
        this.handleClicking();
    }

    getRandomProperty() {

        let allKeys = Object.keys(this.words);

        let randomINT = Math.floor( Math.random() * allKeys.length );

        let randomPropName = allKeys[randomINT];

        let randomPropKey = this.words[randomPropName];

        let randomPropKeyNumber = Math.floor( Math.random() * randomPropKey.length );

        var randomValue = randomPropKey[ randomPropKeyNumber ];

        this.value = randomValue;

        document.querySelector(".game-info .category span").innerHTML = randomValue;

        let lettersGuessContainer = document.querySelector(".letters-guess");

        let lettersAndSpace = Array.from(randomValue);

        lettersAndSpace.forEach(letter => {

        let emptySpan = document.createElement("span");

        if (letter === ' ') {

            emptySpan.className = 'with-space';

        }

        lettersGuessContainer.appendChild(emptySpan);

        });

    }

    generateLetters(letters) {

        letters.forEach(letter => {
            
            let span = document.createElement("span");

            let theLetter = document.createTextNode(letter);

            span.appendChild(theLetter);

            span.className = 'letter-box';

            this.lettersContainer.appendChild(span);

        });

    }

    handleClicking() {

        let guessSpans = document.querySelectorAll(".letters-guess span");

        let wrongAttempts = 0;

        let theDraw = document.querySelector(".hangman-draw");

        document.addEventListener("click", (e) => {

        let theStatus = false;

        if (e.target.className === 'letter-box') {

            e.target.classList.add("clicked");

            let theClickedLetter = e.target.innerHTML.toLowerCase();

            let theChosenWord = [];

            if (this.value) {
                theChosenWord = Array.from(this.value.toLowerCase());
            }

            theChosenWord.forEach((wordLetter, WordIndex) => {

            if (theClickedLetter == wordLetter) {

                theStatus = true;

                guessSpans.forEach((span, spanIndex) => {

                    if (WordIndex === spanIndex) {

                        span.innerHTML = theClickedLetter;

                    }

                });

            }

            });

            if (theStatus !== true) {

            wrongAttempts++;

            theDraw.classList.add(`wrong-${wrongAttempts}`);

            if (wrongAttempts === 8) {

                this.endGame();

                lettersContainer.classList.add("finished");

            }

            }

        }

        });

    }

    endGame() {

        let div = document.createElement("div");

        let divText = document.createTextNode(`Game Over, The Word Is ${this.value}`);

        div.appendChild(divText);

        div.className = 'popup';

        document.body.appendChild(div);

    }

}












new Game();