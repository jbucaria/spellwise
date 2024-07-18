const WordInput = require('../../models/wordsModel');

// Keep track of current card

export const cardsEl = [];

// Create all cards
export function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

let currentActiveCard = 0;

function updateCurrentText() {
  const currentEl = document.getElementById('current');
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Create a single card in DOM
function createCard(data, index) {
  const cardsContainer = document.getElementById('cards-container');

  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
<div class="inner-card">
  <div class="inner-card-front">
    <p>${data.definition}</p>
    <button id="inner-button" class="btnn btn-small">
      <i class="fas fa-play"></i> Say Word 
    </button>
  </div>
  <div class="inner-card-back">
    <p>${data.word}</p>
  </div>
</div>



  `;
  // Show number of cards
  updateCurrentText();

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

export function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.4;
  utterance.lang = 'en-us';
  speechSynthesis.speak(utterance);
}

export function attachButtonListeners() {
  const buttons = document.querySelectorAll('.inner-card-front button');

  buttons.forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation(); // Prevent parent click action
    });
  });
}
