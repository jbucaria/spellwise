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

addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let message = '';
  let className = '';

  let spellingWords = localStorage.getItem('spellingWords');
  spellingWords = spellingWords ? JSON.parse(spellingWords) : [];

  const addWordEl = document.getElementById('add-word').value;
  const index = spellingWords.findIndex(
    (spellingWord) => spellingWord === addWordEl,
  );

  if (addWordEl === '') {
    className = 'error';
    message = 'Please Enter a Word';
  } else if (index === -1) {
    spellingWords.push(addWordEl);
    localStorage.setItem('spellingWords', JSON.stringify(spellingWords));
    className = 'success';
    message = 'Word Added';
  } else {
    className = 'error';
    message = 'Word Already In List';
  }

  setTimeout(() => {
    messageEl.classList.remove(className);
    validationEl.textContent = '';
    document.getElementById('add-word').value = '';
  }, 1000);
  updateValidation(message, className);

  spellingWords.forEach((word) => {
    // Check if the word already exists in the list
    const exists = Array.from(wordList.children).some(
      (li) => li.textContent === word,
    );

    if (!exists) {
      wordBox.classList.add('word-box');
      const li = document.createElement('li');
      li.textContent = word;
      wordList.appendChild(li);
    }
  });
});

displayList.addEventListener('click', () => {
  let spellingWords = localStorage.getItem('spellingWords');
  spellingWords = spellingWords ? JSON.parse(spellingWords) : [];
  spellingWords.forEach((word) => {
    // Check if the word already exists in the list
    const exists = Array.from(wordList.children).some(
      (li) => li.textContent === word,
    );

    if (!exists) {
      wordBox.classList.add('word-box');
      const li = document.createElement('li');
      li.textContent = word;
      wordList.appendChild(li);
    }
  });
});
