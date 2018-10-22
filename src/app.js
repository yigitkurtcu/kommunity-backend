import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { initializePassport } from './passport/init';
import { initializeRoutes } from './routes';

const Sentry = require('@sentry/node');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// ERROR HANDLING
Sentry.init({
  dsn: 'https://3a6da0069d6545d89e80cb157cdca689@sentry.io/1305830',
  // Set debug and env based on env value
  debug: true,
  environment: 'local',
  sampleRate: 1.0,
  attachStacktrace: true,
});
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TODO update cors policy
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

initializePassport(app);
initializeRoutes(app);

// eslint-disable-next-line
app.use((req: express$Request, res: express$Response, next: express$NextFunction) => {
  res.statusCode = 404;
  res.json({ message: 'not_found' });
});

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
// eslint-disable-next-line
app.use((err: Error, req: express$Request, res: express$Response, next: express$NextFunction) => {
  res.statusCode = 500;
  // eslint-disable-next-line no-underscore-dangle
  res.json({ message: 'internal_error', eventId: Sentry.getCurrentHub()._lastEventId });
});

module.exports = app;
