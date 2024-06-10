const deleteBtn = document.getElementById('delete-btn');
const loginMessage = document.getElementById('login-message');
const deleteWords = document.getElementById('delete-word');
const clearWords = document.getElementById('clear-word');

const usersStr = localStorage.getItem('users');
const users = JSON.parse(usersStr);

deleteBtn.addEventListener('click', () => {
  const userToDelete = document.getElementById('username-to-delete').value;
  const index = users.findIndex((users) => users.email === userToDelete);

  if (index !== -1) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loginMessage.classList.add('success');
    loginMessage.textContent = 'Account Deleted';

    setTimeout(() => {
      loginMessage.classList.remove('success');
      loginMessage.textContent = '';
      document.getElementById('username-to-delete').value = '';
    }, 1500);
  } else {
    loginMessage.classList.add('error');
    loginMessage.textContent = 'Account Not Found';
    setTimeout(() => {
      loginMessage.classList.remove('error');
      loginMessage.textContent = '';
      document.getElementById('username-to-delete').value = '';
    }, 1500);
  }
});

deleteWords.addEventListener('click', () => {
  localStorage.removeItem('spellingWords');
});
clearWords.addEventListener('click', () => {
  localStorage.removeItem('correctWords');
});
