const newUserSubmit = document.getElementById('submit-new-user');
const loginMessage = document.getElementById('validationMessage');
// const form = document.getElementById('form');
const messageBox = document.getElementById('message');

function updateValidation(message, className) {
  messageBox.classList.add(className);
  loginMessage.textContent = message;
}

newUserSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  let message = '';
  let className = '';
  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;

  if (emailInput === '' || passwordInput === '') {
    className = 'error';
    message = 'Please fill in all fields';
    updateValidation(message, className);
    setTimeout(() => {
      messageBox.classList.remove(className);
      loginMessage.textContent = '';
    }, 1500);
    return;
  }

  const newUser = {
    email: emailInput,
    password: passwordInput,
  };

  let users = localStorage.getItem('users');
  users = users ? JSON.parse(users) : [];

  //Chanded user form users
  const index = users.findIndex((user) => user.email === emailInput);
  if (index === -1) {
    console.log(users.email);
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    className = 'success';
    message = 'User Created';

    document.getElementById('form').reset();
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1000);
  } else {
    className = 'error';
    message = 'Email Already Used';
  }

  updateValidation(message, className);

  setTimeout(() => {
    messageBox.classList.remove(className);
    loginMessage.textContent = '';
  }, 1500);
});
