import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import firebase from './config/firebase.js';
import dotenv from 'dotenv';

// routes
import indexRouter from './routes/index.js';
import seederRouter from './routes/seeders.js';
import recomendationSyestemRouter from './routes/recomendation_system.js';
import schools from './routes/schools.js'
import address from './routes/address.js'

dotenv.config();

firebase();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/recomendation_system', recomendationSyestemRouter);
app.use('/seeders', seederRouter);
app.use('/schools', schools);
app.use('/address', address);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app; 
