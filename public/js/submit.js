const speakBtn = document.getElementById('say-btn');
const checkBtn = document.getElementById('check-btn');
const synth = window.speechSynthesis;
const spellingStr = localStorage.getItem('spellingWords');
const spellingWords = JSON.parse(spellingStr);
const validationEl = document.getElementById('validationMessage');
const nextBtn = document.getElementById('next-btn');
const messageEl = document.getElementById('message-2');
let word = spellingWords[0];

function getRandomItem(arr) {
  if (arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function speak() {
  const inputText = word;
  if (inputText !== '') {
    const utterance = new SpeechSynthesisUtterance(inputText);
    synth.speak(utterance);
  } else {
    console.log('Please enter some text to speak.');
  }
}

// function getLocalStorageItem(key) {
//   const item = localStorage.getItem(key);
//   return item ? JSON.parse(item) : [];
// }

function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function updateValidation(message, className) {
  messageEl.classList.add(className);
  validationEl.textContent = message;
}

speakBtn.addEventListener('click', () => {
  if (spellingWords.length === 0) {
    updateValidation('List Empty', 'error');
    setTimeout(() => {
      messageEl.classList.remove('error');
      validationEl.textContent = '';
      document.getElementById('validationMessage').value = '';
    }, 1500);
  }
  speak();
});

nextBtn.addEventListener('click', () => {
  word = getRandomItem(spellingWords);
  console.log(word);
});

checkBtn.addEventListener('click', () => {
  const wordInput = document.getElementById('spell-word').value;
  let correctWords = localStorage.getItem('correctWords');
  correctWords = correctWords ? JSON.parse(correctWords) : [];
  let message = '';
  let className = '';

  if (wordInput === word) {
    message = 'Correct';
    className = 'success';
    correctWords.push(word);
    setLocalStorageItem('correctWords', correctWords);
    spellingWords.splice(0, 1);
    setLocalStorageItem('spellingWords', spellingWords);
    word = getRandomItem(spellingWords);
  } else if (wordInput === '') {
    message = 'Please Enter Spelling Word';
    className = 'error';
  } else {
    message = 'Incorrect';
    className = 'error';
  }

  updateValidation(message, className);

  setTimeout(() => {
    messageEl.classList.remove(className);
    validationEl.textContent = '';
    document.getElementById('spell-word').value = '';
  }, 1500);
});

const textContainer = document.getElementById('spell-word');
const deleteKey = document.querySelector('.delete');
const spaceKey = document.querySelector('.space');
const capsLock = document.querySelector('.capslock');
const allKey = document.querySelectorAll('.key');
let isCaps = false;

let isTypingWithKeyboard = false; // Flag to differentiate keyboard input

// Function to update the displayed content
// function updateContent() {
//   const content = textContainer.value.replace('|', '');
//   textContainer.value = content;
// }

// Function to update the cursor position
function updateCursor(cursorIndex) {
  let content = textContainer.value;
  content = content.replace('|', '');

  if (cursorIndex >= 0 && cursorIndex <= content.length) {
    textContainer.value =
      content.slice(0, cursorIndex) + content.slice(cursorIndex);
  }
}
// Function to handle typing
function handleTyping(text) {
  let content = textContainer.value;
  let cursorIndex = content.indexOf('|');

  if (cursorIndex === -1) {
    content += text;
  } else {
    content = content.slice(0, cursorIndex) + text + content.slice(cursorIndex);
    cursorIndex += text.length;
  }

  textContainer.value = content;
  updateCursor(cursorIndex + text.length); // Move cursor beside the last letter typed
}

// Add event listener for physical keyboard typing
document.addEventListener('keydown', event => {
  const { key } = event;

  // Set the flag for keyboard input
  isTypingWithKeyboard = true;

  if (key === 'Backspace') {
    const cursorIndex = textContainer.innerText.indexOf('|');
    if (cursorIndex > 0) {
      handleTyping(''); // Delete at cursor position
    }
  } else if (key === 'Enter') {
    handleTyping('\n');
  } else if (key === ' ') {
    handleTyping(' ');
  } else if (key === 'CapsLock') {
    capsLock.click();
  } else if (key.length === 1) {
    handleTyping(isCaps ? key.toUpperCase() : key.toLowerCase());
  }
});

// Add event listeners for on-screen keyboard clicks (similar to your existing code)
for (const key of allKey) {
  key.addEventListener('click', () => {
    if (
      key.classList.contains('delete') ||
      key.classList.contains('enter') ||
      key.classList.contains('space') ||
      key.classList.contains('capslock')
    ) {
      return;
    }

    // Handle typing only if not typing with the keyboard
    if (!isTypingWithKeyboard) {
      handleTyping(key.innerText);
    }

    // Reset the flag after handling the click
    isTypingWithKeyboard = false;
  });
}

// Initialize cursor on load
updateCursor(0);

deleteKey.addEventListener('click', () => {
  const textContainerContent = textContainer.value;
  if (textContainerContent.length === 0) {
    return;
  }

  const newContent = textContainerContent.slice(
    0,
    textContainerContent.length - 1,
  );
  textContainer.value = newContent;
  updateCursor(newContent.length); // Move cursor beside the last letter typed
});

spaceKey.addEventListener('click', () => {
  const content = textContainer.innerText;
  const newContent = `${content}\u00A0`;
  textContainer.innerText = newContent;
  updateCursor(newContent.length); // Move cursor beside the last letter typed
});

capsLock.addEventListener('click', () => {
  if (isCaps) {
    capsLock.classList.remove('active');
    for (const key of allKey) {
      if (
        key.classList.contains('delete') ||
        key.classList.contains('enter') ||
        key.classList.contains('space') ||
        key.classList.contains('capslock')
      ) {
        //
      } else key.innerText = key.innerText.toLowerCase();
    }
  } else {
    capsLock.classList.add('active');
    for (const key of allKey) {
      if (
        key.classList.contains('delete') ||
        key.classList.contains('enter') ||
        key.classList.contains('space') ||
        key.classList.contains('capslock')
      ) {
        //
      } else key.innerText = key.innerText.toUpperCase();
    }
  }
  isCaps = !isCaps;
});
