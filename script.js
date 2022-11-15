// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scorePly0 = document.querySelector('#score--0');
const scorePly1 = document.querySelector('#score--1');
const currentPly0 = document.getElementById('current--0');
const currentPly1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.new');
const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};

// Starting conditions
scorePly0.textContent = 0;
scorePly1.textContent = 0;
currentPly0.textContent = 0;
currentPly1.textContent = 0;
diceEl.classList.add('hidden');

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `img/dice-${dice}.png`;
        // 3. Check for rolled 1
        if (dice !== 1) {
        // Add dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
        // Switch to the next player
            switchPlayer();
        }
    }
});

// Button hold functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // Check if player's score is >= 20
        if (scores[activePlayer] >= 20) {
        playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            //document.querySelector('.winner').classList.remove('hidden');
            document.querySelector(`.winner--${activePlayer}`).classList.remove('hidden');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

// Button New Game functionality
btnNew.addEventListener('click', function () {
    // 1. Reset all users scores
    scorePly0.textContent = 0;
    scorePly1.textContent = 0;
    currentPly0.textContent = 0;
    currentPly1.textContent = 0;
    activePlayer = 0;
    document.querySelector(`.winner--${activePlayer}`).classList.add('hidden');
    document.querySelector('.dice').classList.add('hidden');
});