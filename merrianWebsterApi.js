const fs = require('fs');
const superagent = require('superagent');
const dotenv = require('dotenv');
const AppError = require('./utils/appError');

dotenv.config({ path: 'config.env' });

const apiKey = process.env.API_KEY;

const readFilePro = file =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(new AppError('no file found'));
      resolve(data);
    });
  });

const appendFilePro = (file, data) =>
  new Promise((resolve, reject) => {
    fs.readFile('word.json', (err, fileData) => {
      if (err && err.code !== 'ENOENT') {
        reject(new AppError('Error reading file'));
      }

      let existingData = [];
      if (fileData) {
        try {
          existingData = JSON.parse(fileData);
        } catch (error) {
          reject(new AppError('error pushing JSON'));
        }
      }

      existingData.push(JSON.parse(data));

      const jsonData = JSON.stringify(existingData, null, 2);

      fs.writeFile(file, jsonData, writeErr => {
        if (writeErr) reject(new AppError('could not write the file'));
        resolve('success');
      });
    });
  });

const writeNewWord = async () => {
  try {
    const data = await readFilePro(`${__dirname}/word.txt`);

    const res = await superagent.get(
      `https://www.dictionaryapi.com/api/v3/references/sd2/json/${data}?key=${apiKey}`,
    );
    console.log(res.body);
    if (Array.isArray(res.body)) {
      const item = res.body.find(entry => entry.meta.id === `${data}:1`);

      if (item) {
        const { meta, fl, shortdef } = item;
        const idWithoutSuffix = meta.id.replace(/:\d+$/, '');
        const jsonData = JSON.stringify({
          id: idWithoutSuffix,
          fl,
          definition: shortdef.join(', '),
        });
        await appendFilePro('word.json', jsonData);
        console.log('data appendid to json');
      }
    }
  } catch (err) {
    console.log(err);
  }
};

writeNewWord();
