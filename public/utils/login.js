const submitBtn = document.getElementById('submit');

const login = (email, password) => {
  alert(`Email: ${email}, Password: ${password}`);
};

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
