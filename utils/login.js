const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let messageEl = document.getElementById('message');
  let loginMessage = document.getElementById('login-message');
  let passwordInput = document.getElementById('password').value;
  let userInput = document.getElementById('username').value;
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
