
// console.log('Let"s Play');

const images = document.querySelectorAll('.game-image');

// console.log(images);

// for (let i = 0; i <= images.length; i++) {
    // images[i].addEventListener('click', flipCard);
// }

// images.addEventListener('click', flipCard);

images.forEach(card => card.addEventListener('click', flipCard));

let hasFilppedCard = false;

function flipCard() {
    console.log('Clicked', this);
    this.classList.add('filp');

    if (!hasFilppedCard) {

        hasFilppedCard = true;
        let imageOne = this;

        console.log(hasFilppedCard, imageOne)
    }
}





