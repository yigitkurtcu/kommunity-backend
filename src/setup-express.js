import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import tokenAuth from './middlewares/jwt';
import config from './config';

export const initializeExpressApp = () => {
  const app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  app.set('superSecret',config.secret);

  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }));

  app.use(tokenAuth.tokenControl);

  return app;
};
