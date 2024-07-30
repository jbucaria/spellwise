/* eslint-disable */

import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { createCards, cardsEl, speakWord, attachButtonListeners } from './main';
import { writeNewWord, sendDataToBackend } from './createNewWord';
import { deleteWord } from './deleteWord';
import { showAlert } from './alerts';
import { signUp } from './signUp';
import { resetPassword, forgotPassword, getTokenFromUrl } from './passWord';

// DOM ELEMENTS
// User Authentication Forms
const loginForm = document.querySelector('.login-form');
const signUpForm = document.querySelector('.signup-form');
const logOutBtn = document.querySelector('.nav__el--logout');
const forgotPasswordBtn = document.getElementById('forgot-password');
const requestBtn = document.getElementById('request-button');
const resetPasswordForm = document.querySelector('.reset-form .form--login');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

// Cards
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const cardsContainer = document.getElementById('cards-container');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const newWordEl = document.getElementById('newword');
const listDropdown = document.getElementById('list-dropdown');
const chooseList = document.getElementById('activelist-dropdown');
const addCardBtn = document.getElementById('add-card');
const addContainer = document.getElementById('add-container');
const clearBtn = document.getElementById('clear');
const spellBtn = document.getElementById('spell');
const sayContainer = document.getElementById('say-container');
const hideSpellBtn = document.getElementById('hide-spell');
const checkWordEl = document.getElementById('checkword');
const checkWordBtn = document.getElementById('check-word');

// FUNCTIONS
// Sign Up
const handleSignUp = e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('confirm-password').value;

  signUp(name, email, password, passwordConfirm);
};

// Login
const handleLogin = e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
};

// Update User Data
const handleUpdateUserData = e => {
  e.preventDefault();
  const form = new FormData();
  form.append('name', document.getElementById('name').value);
  form.append('email', document.getElementById('email').value);
  form.append('photo', document.getElementById('photo').files[0]);

  updateSettings(form, 'data');
};

// Update User Password
const handleUpdateUserPassword = async e => {
  e.preventDefault();
  document.querySelector('.btn--save-password').textContent = 'Updating...';

  const passwordCurrent = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;

  await updateSettings(
    { passwordCurrent, password, passwordConfirm },
    'password',
  );

  document.querySelector('.btn--save-password').textContent = 'Save password';
  document.getElementById('password-current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password-confirm').value = '';
};

// Forgot Password
const handleForgotPassword = () => {
  const email = document.getElementById('email').value;
  forgotPassword(email);
};

// Reset Password
const handleResetPassword = async e => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;

  if (password !== passwordConfirm) {
    showAlert('error', 'Passwords do not match!');
    return;
  }

  const token = getTokenFromUrl();
  await resetPassword(password, passwordConfirm, token);
};

// Cards Navigation
let currentActiveCard = 0;

const updateCurrentText = () => {
  const currentEl = document.getElementById('current');
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
};

// Event Listeners
if (signUpForm) signUpForm.addEventListener('submit', handleSignUp);
if (loginForm) loginForm.addEventListener('submit', handleLogin);
if (logOutBtn) logOutBtn.addEventListener('click', logout);
if (userDataForm) userDataForm.addEventListener('submit', handleUpdateUserData);
if (userPasswordForm)
  userPasswordForm.addEventListener('submit', handleUpdateUserPassword);
if (forgotPasswordBtn)
  forgotPasswordBtn.addEventListener('click', () =>
    location.assign('/forgotPassword'),
  );
if (requestBtn) requestBtn.addEventListener('click', handleForgotPassword);
if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', handleResetPassword);

if (cardsContainer) {
  createCards();
  attachButtonListeners();
  updateCurrentText();
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard -= 1;
    if (currentActiveCard < 0) currentActiveCard = 0;
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard += 1;
    if (currentActiveCard > cardsEl.length - 1)
      currentActiveCard = cardsEl.length - 1;
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
  });
}

const speak = () => {
  const buttons = document.querySelectorAll('.inner-card-front button');
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      const spellingWord = cardsData[currentActiveCard].word;
      speakWord(spellingWord);
    });
  });
};

speak();

if (showBtn)
  showBtn.addEventListener('click', () => addContainer.classList.add('show'));
if (hideBtn)
  hideBtn.addEventListener('click', () =>
    addContainer.classList.remove('show'),
  );

if (chooseList) {
  chooseList.addEventListener('change', () => {
    const activeListLabel = document.getElementById('activelist-label');
    const activeList = chooseList.value;
    activeListLabel.textContent = activeList;
    localStorage.setItem('selectedList', activeList);
    sendDataToBackend(activeList);
    setTimeout(() => location.reload(), 500);
  });
}

if (addCardBtn) {
  addCardBtn.addEventListener('click', () => {
    const listName = listDropdown.value;
    const newWord = newWordEl.value;
    if (newWord.trim()) {
      writeNewWord(newWord, listName);
      newWordEl.value = '';
      addContainer.classList.remove('show');
    }
  });
}

if (spellBtn)
  spellBtn.addEventListener('click', () => sayContainer.classList.add('show'));
if (hideSpellBtn)
  hideSpellBtn.addEventListener('click', () =>
    sayContainer.classList.remove('show'),
  );

if (checkWordBtn) {
  checkWordBtn.addEventListener('click', () => {
    const wordToCheck = checkWordEl.value;
    if (wordToCheck.trim()) {
      if (wordToCheck === cardsData[currentActiveCard].word) {
        currentActiveCard++;
        updateCurrentText();
        showAlert('success', 'Correct!!');
        speakWord('correct');
        setTimeout(() => {
          checkWordEl.value = '';
          sayContainer.classList.remove('show');
        }, 1500);
      } else {
        showAlert('error', 'Incorrect, please try again');
        speakWord('please try again');
        setTimeout(() => {
          checkWordEl.value = '';
        }, 1500);
      }
    }
  });
}

if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    const word = cardsData[currentActiveCard]._id;
    deleteWord(word);
  });
}
