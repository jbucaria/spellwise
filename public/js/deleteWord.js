import axios from 'axios';
import { showAlert } from './alerts';

export const deleteWord = async wordId => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/words/${wordId}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Word Deleted!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (err) {
    showAlert('error', 'Word not found');
  }
};
