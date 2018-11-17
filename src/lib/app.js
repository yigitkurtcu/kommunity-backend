import * as http from 'http';
import type { Server } from 'http';
import path from 'path';
import Express from 'express';
import Cors from 'cors';
import CookieParser from 'cookie-parser';
import Morgan from 'morgan';
import Passport from 'passport';
import type { Sentry } from '@sentry/node';
import { getAllFiles } from './helpers';
import Sequelize from 'sequelize';
import DbClient, { importModels } from './db-client';
import { ApolloServer } from 'apollo-server-express';

import authenticationMiddleware from '$/middlewares/auth';
import { getTypeDefs } from '$/graphql/type-defs';
import { getResolvers } from '$/graphql/resolvers';


export default class App {
  constructor(appConfig: AppConfig) {
    this.rootPath = path.resolve();
    this.srcPath = path.join(this.rootPath, 'src');
    this.passportStrategiesPath = path.join(this.srcPath, 'passport-strategies');
    this.routesPath = path.join(this.srcPath, 'routes');
    this.modelsPath = path.join(this.srcPath, 'models');
    this.init(appConfig);
  }

  rootPath: string;

  srcPath: string;

  passportStrategiesPath: string;

  routesPath: string;

  modelsPath: string;

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
    if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV !== null && process.env.NODE_ENV !== '') {
      return process.env.NODE_ENV;
    }
    return 'development';
  }

  createRouter = (): express$Router => Express.Router();

  init = (appConfig: AppConfig): void => {
    this.config = appConfig;
    this.initServer();
  };

  initServer = (): void => {
    const that: App = this;
    const { port } = this.config.appServer;
    this.initExpressApp();
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

  initExpressApp = (): void => {
    // eslint-disable-next-line
    const sentry: Sentry = require('@sentry/node');
    const appServerConfig: AppServerConfig = this.config.appServer;
    const sentryConfig: AppServerSentryConfig = appServerConfig.sentry;
    const morganConfig: AppServerMorganConfig = appServerConfig.morgan;
    this.express = Express();

    this.express.set('view engine', appServerConfig.viewEngine);
    this.express.set('views', path.join(this.rootPath, appServerConfig.viewFolderPath));

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
    this.express.use(Express.static(path.join(this.rootPath, appServerConfig.publicFolderPath)));
    this.express.use(Passport.initialize());

    this.initDbClient();
    this.initModels();
    this.initPassportStrategies();
    this.initRoutes();
    this.initGqlServer();

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

  initDbClient = (): void => {
    this.sequelize = DbClient(this.config.dbClient);
  };

  initModels = (): void => {
    this.models = importModels(this.modelsPath, this.sequelize);
  };

  initPassportStrategies = (): void => {
    const that = this;
    getAllFiles(this.passportStrategiesPath, [])
      .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach((file: string) => {
        // eslint-disable-next-line
        Passport.use(require(file)(that));
      });
  };

  initRoutes = (): void => {
    const that = this;
    getAllFiles(this.routesPath, [])
      .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach((file: string) => {
        // eslint-disable-next-line
        require(file)(that);
      });
  };

  initGqlServer = (): void => {
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
}
