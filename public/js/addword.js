const addBtn = document.getElementById('add-btn');
const validationEl = document.getElementById('validationMessage');
const messageEl = document.getElementById('message-1');
const wordList = document.getElementById('word-container');
const displayList = document.getElementById('display-btn');
const wordBox = document.getElementById('word-box');

function updateValidation(message, className) {
  messageEl.classList.add(className);
  validationEl.textContent = message;
}

addBtn.addEventListener('click', () => {});
