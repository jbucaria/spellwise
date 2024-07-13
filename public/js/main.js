import { get } from 'mongoose';

// Keep track of current card

export const cardsEl = [];

// Create all cards
export function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

export function updateCurrentText() {
  let currentActiveCard = 0;
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
  <h3>${data.fl}</h3>
  <br>
  
    <p>${data.definition}</p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.word}
    </p>
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
