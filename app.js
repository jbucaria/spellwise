require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
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
  console.log('Running in development mode');
} else if (process.env.NODE_ENV === 'production') {
  console.log('running in production mode');
} else {
  console.log('Running in unkown mode');
}

//Body Parser = Parses the JSON payload and makes it available in req.body
//Cookie Parser = Parses data from cookie (specifically the JWT token)
app.use(express.json());
app.use(cookieParser());

//Serves static files from the specified directory.
app.use(express.static(path.join(__dirname, 'public')));

//Set security headers
// app.use(helmet());

//Middleware - logs the duration of the query,
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Query took ${duration} milliseconds`);
  });
  next();
});

//Testing midleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

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
