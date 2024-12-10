// script.js
let cards = [];
let moves = 0;
let flippedCards = [];
let matchedPairs = 0;
let timerInterval;
let seconds = 0;

// Elements
const grid = document.querySelector('.game-grid');
const moveCounter = document.getElementById('move-counter');
const timer = document.getElementById('timer');
const congrats = document.getElementById('congrats');
const finalMoves = document.getElementById('final-moves');
const finalTime = document.getElementById('final-time');
const newGameBtn = document.getElementById('new-game');
const playAgainBtn = document.getElementById('play-again');

// Initialize the game
function initializeGame() {
    grid.innerHTML = '';
    cards = generateCards();
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    seconds = 0;
    clearInterval(timerInterval);
    moveCounter.textContent = moves;
    timer.textContent = formatTime(seconds);
    congrats.style.display = 'none';

    shuffle(cards);
    createCardElements(cards);
    startTimer();
}

// Generate cards (e.g., pairs of numbers or emojis)
function generateCards() {
    const pairs = Array.from({ length: 8 }, (_, i) => i + 1); // Adjust pairs for 4x4 grid
    return [...pairs, ...pairs];
}

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create card elements
function createCardElements(cards) {
    cards.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = value;
        card.addEventListener('click', handleCardClick);
        grid.appendChild(card);
    });
}

// Handle card click
function handleCardClick(e) {
    const card = e.target;
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        moveCounter.textContent = moves;
        checkForMatch();
    }
}

// Check for matching cards
function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === cards.length / 2) endGame();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
}

// Timer
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timer.textContent = formatTime(seconds);
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// End game
function endGame() {
    clearInterval(timerInterval);
    finalMoves.textContent = moves;
    finalTime.textContent = timer.textContent;
    congrats.style.display = 'block';
}

// Event listeners
newGameBtn.addEventListener('click', initializeGame);
playAgainBtn.addEventListener('click', initializeGame);

// Start the game
initializeGame();
