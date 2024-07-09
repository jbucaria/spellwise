const axios = require('axios');

const AppError = require('./appError');
const WordInput = require('../models/wordsModel');

const apiKey = process.env.API_KEY;

exports.writeNewWord = async (req, res) => {
  try {
    const newData = 'father';

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
    }
    throw new AppError('Invalid response from API');
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
