// Keep track of current card

export const cardsEl = [];

const cardsData = [
  {
    question: 'What must a variable?',
    answer: 'A letter, $ or _',
  },
  {
    question: 'What is a variable?',
    answer: 'Container for a piece of data',
  },
  {
    question: 'Example of Case Sensitive Variable',
    answer: 'thisIsAVariable',
  },
  {
    question: 'Example of Case Sensitive Variable',
    answer: 'thisIsAVariable',
  },
];

// Create all cards
export function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

export function updateCurrentText() {
  let currentActiveCard = 0;
  const currentEl = document.getElementById('current');
  currentEl.innerText = `${currentActiveCard + 2}/${cardsEl.length}`;
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
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
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
