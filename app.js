const express = require('express');
const morgan = require('morgan');
const path = require('path');
const wordRouter = require('./routes/wordRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Mounting the Router

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/words', wordRouter);

module.exports = app;
