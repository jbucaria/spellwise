import axios from 'axios';
import { showAlert } from './alerts';

export const writeNewWord = async newWord => {
  try {
    // Fetch data from the dictionary API
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`,
    );
    const data = response.data;
    const firstEntry = data[0];

    // Extract required fields
    const wordData = {
      word: firstEntry.word,
      phonetic: firstEntry.phonetics[0]?.text || '',
      definition: firstEntry.meanings[0].definitions[0].definition, // Get the first definition
      audio: firstEntry.phonetics.find(p => p.audio)?.audio || '', // Get audio if available
    };

    // Send a POST request to save the word in your database
    const saveResponse = await axios.post(
      'http://127.0.0.1:8000/api/v1/words',
      wordData,
    );
    if (res.data.status === 'success') {
      showAlert('success', 'Word saved successfully');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (err) {
    showAlert('error', 'Word already exists');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};
