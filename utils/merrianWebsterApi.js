const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
const AppError = require('./appError');
const WordInput = require('../models/wordsModel');

dotenv.config({ path: 'config.env' });

const apiKey = process.env.API_KEY;

exports.writeNewWord = async (req, res) => {
  try {
    const newData = 'roof';

    const apiResponse = await axios.get(
      `https://www.dictionaryapi.com/api/v3/references/sd2/json/${newData}?key=${apiKey}`,
    );

    if (Array.isArray(apiResponse.data)) {
      const item = apiResponse.data.find(
        entry => entry.meta.id === `${newData}:1`,
      );

      if (item) {
        const { meta, fl, shortdef } = item;
        const idWithoutSuffix = meta.id.replace(/:\d+$/, '');

        const newWord = await WordInput.create({
          word: idWithoutSuffix,
          fl,
          definition: shortdef.toString(),
        });

        return res.status(201).json({
          status: 'success',
          data: {
            word: newWord,
          },
        });
      }
      return res.status(404).json({
        status: 'fail',
        message: 'Word not found in the API',
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Invalid response from the API',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
