import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/main');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/users/logout',
    });
    if ((res.data.status = 'success'))
      showAlert('success', 'Logged out successfully!');
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};

export const forgotPassword = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Email Sent');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const resetPassword = async (password, confirmPassword, token) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:8000/api/v1/users/resetPassword/${token}`,
      data: {
        password,
        confirmPassword,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password Reset');
      window.setTimeout(() => {
        location.assign('/main');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
