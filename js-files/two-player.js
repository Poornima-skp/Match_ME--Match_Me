class MatchMe {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0) {
                // this.nextPlayer();
                right.style.display = 'flex'
                left.style.display = 'none'
                // ready();
            }
        }, 1000);
    }
    // nextPlayer() {
    // clearInterval(this.countdown);
    // document.getElementById('player2').style.display='flex';
    // ready();
    // }
    // winner() {
    // clearInterval(this.countdown);

    // document.getElementById('won-text').classList.add('visible');

    // }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if (this.canFlipCard(card)) {
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
    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if (this.matchedCards.length === this.cardsArray.length)
            ready();
    }
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
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
    canFlipCard(card) {
        // return true;
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready);
// } else {
//     ready();
// }



const overlays = Array.from(document.getElementsByClassName('overlay-text'));
const cards = Array.from(document.getElementsByClassName('card'));
const right = document.getElementById('black-out-right');
const left = document.getElementById('black-out-left');

const playerOne = new MatchMe(10, cards);
const playerTwo = new MatchMe(10, cards);

ready();
function ready() {

    overlays.forEach(overlay => {
        if (right.style.display = 'none') {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('one');
                playerOne.startGame()
            })
        }
        else if (right.style.display = 'flex') {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('two');
                // left.style.visibility = 'collapse'
                // right.style.visibility = 'visible'
                playerTwo.startGame()
            })
        } else {
            winner();
        }
    })

    function winner() {
        if (playerOne.timeRemaining > playerTwo.timeRemaining) {
            document.write(`Player 1 wins by completing in ${playerOne.timeRemaining}.`);
        } else if (playerTwo.timeRemaining > playerOne.timeRemaining) {
            document.write(`Player 2 wins by completing in ${playerOne.timeRemaining}.`);

        }
    }



    cards.forEach(card => {
        card.addEventListener('click', () => {
            playerOne.flipCard(card);
        });
    });
}


