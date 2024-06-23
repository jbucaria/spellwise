const loginEl = document.getElementById('login-btn');
// const logoEl = document.getElementById('logo');
const signEL = document.getElementById('sign-btn');

function navigateToAbout() {
  window.location.href = '/login';
}
loginEl.addEventListener('click', () => {
  navigateToAbout();
});

signEL.addEventListener('click', () => {
  window.location.href = 'sign-up.html';
});
