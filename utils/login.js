const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const messageEl = document.getElementById('message');
  const loginMessage = document.getElementById('login-message');
  const passwordInput = document.getElementById('password').value;
  const userInput = document.getElementById('username').value;
  let found = false;
  const usersStr = localStorage.getItem('users');
  const users = JSON.parse(usersStr);

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === userInput && users[i].password === passwordInput) {
      console.log(users[i].name);
      messageEl.classList.add('success');
      loginMessage.textContent = 'Login Successful';
      found = true;
      setTimeout(() => {
        window.location.href = 'logged-in.html';
      }, 1500);
      break;
    }
  }

  if (!found) {
    messageEl.classList.add('error');
    loginMessage.textContent = 'Invalid email or password';
    setTimeout(() => {
      messageEl.classList.remove('error');
      loginMessage.textContent = '';
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
    }, 2000);
  }
});
