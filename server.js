const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
};

mongoose.connect(DB, clientOptions).then(() => {
  console.log('you are connected to mongoDB');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {});
