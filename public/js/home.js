const loginEl = document.getElementById('login-btn');
// const logoEl = document.getElementById('logo');
const signEL = document.getElementById('sign-btn');

loginEl.addEventListener('click', () => {
  window.location.href = '/login';
});

signEL.addEventListener('click', () => {
  window.location.href = 'sign-up.html';
});
