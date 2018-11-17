import * as http from 'http';
import { Server } from 'http';
import path from 'path';
import Express from 'express';
import Cors from 'cors';
import CookieParser from 'cookie-parser';
import Morgan from 'morgan';
import Passport from 'passport';
import type { Sentry } from '@sentry/node';
import { getAllFiles } from './helpers';
import Sequelize from "sequelize";
import DbClient, { importModels } from './db-client';
import { ApolloServer } from 'apollo-server-express';

import authenticationMiddleware from '$/middlewares/auth';
import { getTypeDefs } from '$/graphql/type-defs';
import { getResolvers } from '$/graphql/resolvers';


export default class App {
  constructor(appConfig: AppConfig) {
    this._rootPath = path.resolve();
    this._srcPath = path.join(this._rootPath, 'src');
    this._passportStrategiesPath = path.join(this._srcPath, 'passport-strategies');
    this._routesPath = path.join(this._srcPath, 'routes');
    this._modelsPath = path.join(this._srcPath, 'models');
    this._init(appConfig);
  };

  _rootPath: string;
  _srcPath: string;
  _passportStrategiesPath: string;
  _routesPath: string;
  _modelsPath: string;
  appServer: Server;
  config: AppConfig;
  express: express$Application;
  sequelize: Sequelize;
  models: AppModels;

  log = (msg: string) => {
    /* eslint-disable-next-line no-console */
    console.log(msg);
  };
  logError = (msg: string) => {
    /* eslint-disable-next-line no-console */
    console.error(msg);
  };
  getEnvValue = (): string => {
    if (process.env.NODE_ENV  !== undefined && process.env.NODE_ENV  !== null && process.env.NODE_ENV !== '') {
      return process.env.NODE_ENV;
    }
    return 'development';
  }
  createRouter = (): express$Router => Express.Router();
  _init = (appConfig: AppConfig): void => {
    this.config = appConfig;
    this._initServer();
  };
  _initServer = (): void => {
    const that: App = this;
    const port: number | string = this.config.appServer.port
    this._initExpressApp();
    const appServer: Server = http.createServer(this.express);
    appServer.listen(port);
    /* istanbul ignore next */
    appServer.on('error', (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          that.logError(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          that.logError(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
    appServer.on('listening', () => {
      that.log(`EXPRESS 🎢  Server is ready at http://localhost:${port}`);
    });
    this.appServer = appServer;
  };
  _initExpressApp = (): void => {
    const sentry: Sentry = require('@sentry/node');
    const appServerConfig: AppServerConfig = this.config.appServer;
    const sentryConfig: AppServerSentryConfig = appServerConfig.sentry;
    const morganConfig: AppServerMorganConfig = appServerConfig.morgan;
    this.express = Express();

    this.express.set('view engine', appServerConfig.viewEngine);
    this.express.set('views', path.join(this._rootPath, appServerConfig.viewFolderPath));

    // Error Handling
    sentry.init({
      dsn: sentryConfig.dsn,
      debug: sentryConfig.debug,
      environment: this.getEnvValue(),
      sampleRate: sentryConfig.sampleRate,
      attachStacktrace: sentryConfig.attachStacktrace,
    });
    // The request handler must be the first middleware on the app
    this.express.use(sentry.Handlers.requestHandler());
    // TODO update cors policy
    this.express.use(Cors());
    this.express.use(Morgan(morganConfig.format, morganConfig.options));
    this.express.use(Express.json());
    this.express.use(Express.urlencoded({ extended: false }));
    this.express.use(CookieParser());
    this.express.use(Express.static(path.join(this._rootPath, appServerConfig.publicFolderPath)));
    this.express.use(Passport.initialize());

    this._initDbClient();
    this._initModels();
    this._initPassportStrategies();
    this._initRoutes();
    this._initGqlServer();

    // eslint-disable-next-line
    this.express.use((req: exExpress$Request, res: express$Response, next: express$NextFunction) => {
      res.statusCode = 404;
      res.json({ message: 'not_found' });
    });

    // The error handler must be before any other error middleware
    this.express.use(sentry.Handlers.errorHandler());

    // Optional fallthrough error handler
    // eslint-disable-next-line
    this.express.use((err: Error, req: exExpress$Request, res: express$Response, next: express$NextFunction) => {
      res.statusCode = 500;
      // eslint-disable-next-line no-underscore-dangle
      res.json({ message: 'internal_error', eventId: sentry.getCurrentHub()._lastEventId });
    });

  };
  _initDbClient = (): void => {
    this.sequelize = DbClient(this.config.dbClient);
  };
  _initModels = (): void => {
    this.models = importModels(this._modelsPath, this.sequelize);
  };
  _initPassportStrategies = (): void => {
    const that = this;
    getAllFiles(this._passportStrategiesPath, [])
      .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach((file: string) => {
        // eslint-disable-next-line
        Passport.use(require(file)(that));
      });
  };
  _initRoutes = (): void => {
    const that = this;
    getAllFiles(this._routesPath, [])
      .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach((file: string) => {
        // eslint-disable-next-line
        require(file)(that);
      });
  };
  _initGqlServer = (): void => {
    const that = this;
    const serverConf = {
      typeDefs: getTypeDefs(),
      resolvers: getResolvers(this),
    };

    this.express.use((req: exExpress$Request, res: express$Response, next: express$NextFunction) => {
      if (req.path === that.config.gqlServer.rootPath) {
        return authenticationMiddleware(req, res, next);
      }
      return next();
    });

    if (this.config.env.current !== 'production') {
      const playgroundServer = new ApolloServer(serverConf);
      playgroundServer.applyMiddleware({ app: this.express, path: this.config.gqlServer.playgroundPath });
    }

    this.express.listen({ port: this.config.gqlServer.port }, () => {
      /* eslint-disable no-console */
      console.log(`GRAPHQL 🚀  Server ready at http://localhost:${that.config.gqlServer.port}${that.config.gqlServer.rootPath}`);
      console.log(`GRAPHQL ✨  Playground server ready at http://localhost:${that.config.gqlServer.port}${that.config.gqlServer.playgroundPath}`);
      /* eslint-enable no-console */
    });

  }

};
