const startBtn = document.getElementById('newGame');
startBtn.addEventListener('click', newGame);
const startUI = document.getElementsByClassName('start')[0];

function newGame() {
    setGameStarted(true);
    setCards(randomGame());
    render();
}

function setCards(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
}

function getCards() {
    return JSON.parse(localStorage.getItem('cards')) || randomGame();
}

function getUserId() {
    return JSON.stringify(ocalStorage.getItem('userId'));
}

function setSelectedIndex(selected) {
    localStorage.setItem('selected', selected);
}

function getSelectedIndex() {
    return localStorage.getItem('selected') ? +localStorage.getItem('selected') : null;
}

function removeSelectedIndex() {
    localStorage.removeItem('selected');
}

function setWinIndex(selected) {
    localStorage.setItem('selected', selected);
}

function getWinIndex() {
    return +localStorage.getItem('selected') || null;
}

function removeWinIndex() {
    localStorage.removeItem('selected');
}

function isGameStarted() {
    return localStorage.getItem('started') === "true" || false;
}

function setGameStarted() {
    localStorage.setItem('started', true);
}

function randomGame() {
    const cards = [];
    for (let i = 0; i < 8; i++) {
        cards.push(i);
        cards.push(i);
    }

    const random = parseInt(Math.random() * 150);


    for (let i = 0; i < random; i++) {
        const random1 = parseInt(Math.random() * 15);
        const random2 = parseInt(Math.random() * 15);

        const temp = cards[random1];
        cards[random1] = cards[random2];
        cards[random2] = temp;
    }

    const cardsUI = document.getElementsByClassName('box');

    for (let i = 0; i < cardsUI.length; i++) {
        cardsUI[i].dataset.key = cards[i];
        cardsUI[i].dataset.index = i;
    }

    return cards;
}

function createCard() {
    const card = document.createElement('div');
    card.classList.add('box');
    return card;
}

function renderBoxes() {
    const cards = getCards();
    const cardsUI = Array.from(document.getElementsByClassName('box'));
    const gameContainer = document.getElementsByClassName('game-container')[0];
    const selectedIndex = getSelectedIndex();
    console.log(selectedIndex)

    
    cardsUI.forEach(cardsUI => cardsUI.remove());

    cards.forEach((card, i)=> {
        const box = createCard();
        box.dataset.key = card;
        box.dataset.index = i;

        if (selectedIndex === i) {
            box.innerHTML = cards[selectedIndex];
            console.log(cards[selectedIndex]);
        }

        if (card === 'win') {
            box.classList.add('win');
        }

        gameContainer.append(box);
    })
}

const gameContainer = document.getElementsByClassName('game-container')[0];
gameContainer.addEventListener('click', function({ target }) {
    if (target.tagName === 'DIV'
        && target.dataset.key !== 'win'
    ) {
        const key = +target.dataset.key;
        const ind = +target.dataset.index;
        const selectedIndex = getSelectedIndex();
        const cards = getCards();
        const selected = selectedIndex !== null ? cards[selectedIndex] : null;

        if (selected !== null && 
            selected === key &&
            selectedIndex !== ind
        ) {
            cards[selectedIndex] = 'win';
            cards[ind] = 'win';
            removeSelectedIndex();
        } else if (selectedIndex === ind) {
            return;
        } else if (selected === null) {
            setSelectedIndex(target.dataset.index);
        }  else {
            removeSelectedIndex();
        }

        setCards(cards);
        renderBoxes();
    }
});

function checkWin() {
    const cards = getCards();

    const isFinished = cards.every(card => card === 'win');
    console.log(isFinished);
}


function renderStart() {
    const isStarted = isGameStarted();
    console.log(isStarted);
    if (!isStarted) {
        startUI.classList.remove('hide');
    }
    else{
        startUI.classList.add('hide');

    }
}


function render() {
    const isStarted = isGameStarted();
    console.log(isStarted)

    renderStart();
    if (isStarted) {
        renderBoxes()
    }
}

render();


