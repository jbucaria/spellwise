const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const wordRouter = require('./routes/wordRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// Global MiddleWares
//Set security headers
// app.use(helmet());

//PUG Settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Development logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
//   console.log('Running in development mode');
// } else if (process.env.NODE_ENV === 'production') {
//   console.log('running in production mode');
// } else {
//   console.log('Running in unkown mode');
// }

// Limit requests from same IP to our API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution in URL. WHitelist aloows duplicates in the query string
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use(compression());

//Body Parser = Parses the JSON payload and makes it available in req.body
//Cookie Parser = Parses data from cookie (specifically the JWT token)
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

//Serves static files from the specified directory.
app.use(express.static(path.join(__dirname, 'public')));

//Middleware - logs the duration of the query,
// app.use((req, res, next) => {
//   const start = Date.now();
//   res.on('finish', () => {
//     const duration = Date.now() - start;
//     console.log(`Query took ${duration} milliseconds`);
//   });
//   next();
// });

//Testing midleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
// console.log(req.cookies);
//   next();
// });

//Mounting the Router
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/words', wordRouter);

//Catch-all route for handling requests to undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

// Handles all errors that occur in the application. It is invoked whenever an error is passed to next(). It sends a JSON response with the error details to the client.
app.use(globalErrorHandler);

module.exports = app;
