const express = require('express');
const morgan = require('morgan');
const wordRouter = require('./routes/wordRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Define a route to make an HTTP request
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello', app: 'spellwise' });
// });

app.use('/api/v1/users', userRouter);
app.use('/api/v1/words', wordRouter);

module.exports = app;
