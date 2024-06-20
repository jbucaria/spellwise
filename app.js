const express = require('express');
const morgan = require('morgan');
const path = require('path');

const AppError = require('./public/utils/appError');
const globlaErrorHandler = require('./controllers/errorController');
const wordRouter = require('./routes/wordRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

//PUG Settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//HTTP request logger. Formats the log output to be concise and colorful
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Parses the JSON payload and makes it available in req.body
app.use(express.json());

//Serves static files from the specified directory.
app.use(express.static(path.join(__dirname, 'public')));

//Mounting the Router
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/words', wordRouter);

//Catch-all route for handling requests to undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

// Handles all errors that occur in the application. It is invoked whenever an error is passed to next(). It sends a JSON response with the error details to the client.
app.use(globlaErrorHandler);

module.exports = app;
