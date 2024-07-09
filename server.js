const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');

process.on('uncaughtException', err => {
  console.log(colors.bgYellow('Unhandled Exception! Shutting Down'));
  console.log(err.name.underline, err.message.bgMagenta);
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const app = require('./app');

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
  console.log('MongoDB connection successful!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log(err.name.underline, err.message.bgMagenta);
  console.log('Unhandled Rejection! Shutting Down'.bgYellow);
  server.close(() => {
    process.exit(1);
  });
});
