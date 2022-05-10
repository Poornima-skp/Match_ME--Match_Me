
//  Setting up a class to get the audio and creating methods for when to play and stop music

class AudioController {
    constructor() {
        this.bgMusic = new Audio('../Attachments/Audio/game-audio.mp3');
        this.flipSound = new Audio('../Attachments/Audio/flip.wav');
        this.bgMusic.volume = 0.7;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    victory() {
        this.stopMusic();
    }
    gameOver() {
        this.stopMusic();
    }
}

// Creating a class to start and implement the actions for the game 

class MatchMe {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();

    }

    //  Method to Start the Game

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    //  Method to calculate the time taken for the game by counting down from the allocated time limit

    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0) {
                this.gameOver();
            }
        }, 1000);
    }

    gameOver() {

        clearInterval(this.countdown);
        this.audioController.gameOver();
        ready();
    }

    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        ready();
    }

    // Rule applied to hide the cards if the selected cards do not match

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    // Checking if the fliped cards match along with addind the number of clicks

    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if (this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    // Checking if cards are matched. If matched go to cardmatch pile if not card mismatch pile

    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    // Writing logic to see if all cards are matched to end the game

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);

        if (this.matchedCards.length === this.cardsArray.length) {
            this.victory();
        }
    }

    // Writng a rule to Flip the cards back if they are not a match

    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    // Shuffling the cards to display for the game

    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }

    // Writing a rule to check if a card can be flipped

    canFlipCard(card) {

        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}


// Getting the required elements

const overlays = Array.from(document.getElementsByClassName('overlay-text'));
const cards = Array.from(document.getElementsByClassName('player-one-card'));
const player1 = document.getElementById("first-player");
const player2 = document.getElementById("second-player");

// Creating 2 Objects of the class 

const playerOne = new MatchMe(90, cards);
const playerTwo = new MatchMe(90, cards);

let i = 0;

// Calling the function ready to invoke the game and is started with an on click event inside the function


ready();
function ready() {

    // Player 1 starts the game

    if (i === 0) {
        overlays[i].addEventListener('click', () => {
            overlays[i].classList.remove('one');
            i++;
            document.getElementById('first-player').classList.add('visible');
            playerOne.startGame();

            cards.forEach(card => {
                card.addEventListener('click', () => {
                    playerOne.flipCard(card);
                });
            });
        })

        //  Player 2 starts the game

    } else if (i === 1) {

        document.getElementById('player-two').classList.add('visible');

        overlays[i].addEventListener('click', () => {
            overlays[i].style.display = 'none';
            player1.style.display = 'none';
            player2.style.display = 'flex';

            i++;
            playerTwo.startGame();

            cards.forEach(card => {
                card.addEventListener('click', () => {
                    playerTwo.flipCard(card);
                });
            });
        })

    } else {
        winner();
    }

    // Calculating the winner and displaying results

    function winner() {
        if (playerOne.timeRemaining > playerTwo.timeRemaining) {

            document.getElementById('winner').innerText = `Player 1 wins by completing with ${playerOne.timeRemaining} seconds remaining compared to ${playerTwo.timeRemaining} of Player 2.`

        } else if (playerTwo.timeRemaining > playerOne.timeRemaining) {
            document.getElementById('winner') = `Player 2 wins by completing with ${playerTwo.timeRemaining} seconds remaining compared to ${playerOne.timeRemaining} of Player 1.`

        } else if (playerOne.timeRemaining == playerTwo.timeRemaining) {
            document.getElementById('winner').innerText = "Its a DRAW"
            
        }
    }

}


