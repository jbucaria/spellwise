/* eslint-disable */

import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { createCards, cardsEl, updateCurrentText } from './main';

// DOM ELEMENTS
// Login/Logout
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

//Cards

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const cardsContainer = document.getElementById('cards-container');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const addContainer = document.getElementById('add-container');

// DELEGATION
// Login Form
if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
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
  });

//Main
// Next button

if (cardsContainer) {
  let currentActiveCard = 0;
  createCards();

  nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard += 1;
    if (currentActiveCard > cardsEl.length - 1) {
      currentActiveCard = cardsEl.length - 1;
    }
    cardsEl[currentActiveCard].className = 'card active';
    // updateCurrentText();
    console.log(currentActiveCard);
  });

  // Prev button
  prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard -= 1;
    if (currentActiveCard < 0) {
      currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
  });

  // Show add container
  showBtn.addEventListener('click', () => addContainer.classList.add('show'));
  // Hide add container
  hideBtn.addEventListener('click', () =>
    addContainer.classList.remove('show'),
  );

  // Add new card
  addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    if (question.trim() && answer.trim()) {
      const newCard = { question, answer };
      createCard(newCard);
      questionEl.value = '';
      answerEl.value = '';
      addContainer.classList.remove('show');
      cardsData.push(newCard);
      setCardsData(cardsData);
    }
  });
}
