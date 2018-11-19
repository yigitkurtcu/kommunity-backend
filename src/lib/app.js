/* eslint-disable no-console */
import * as http from 'http';
import type { Server } from 'http';
import path from 'path';
import Express from 'express';
import Sequelize from 'sequelize';
import { ApolloServer } from 'apollo-server-express';
import Cors from 'cors';
import CookieParser from 'cookie-parser';
import Morgan from 'morgan';
import Passport from 'passport';
import type { Sentry } from '@sentry/node';
import config from '$/config';
import { getAllFiles } from './helpers';
import DbClient, { importModels } from './db-client';

import authenticationMiddleware from '$/middlewares/auth';
import gqlTypeDefs from '$/graphql/type-defs';
import gqlResolvers from '$/graphql/resolvers';

import LocalPassportStrategy from '$/passport-auth/local-strategy';
import JwtPassportStrategy from '$/passport-auth/jwt-strategy';

export default class App {
  routesPath: string;
  server: Server;
  modelsPath: string;
  config: AppConfig;
  express: express$Application;
  sequelize: Sequelize;
  models: AppModels;

  constructor() {
    this.config = config;

    const srcPath = path.join(path.resolve(), 'src');
    this.routesPath = path.join(srcPath, 'routes');
    this.modelsPath = path.join(srcPath, 'models');

    // initialize the app
    this.init();
  }

  init = (): void => {
    const { port } = this.config.server;
    this.initExpressApp();
    this.server = http.createServer(this.express);
    this.server.listen(port);

    /* istanbul ignore next */
    this.server.on('error', (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.log(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.log(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    this.server.on('listening', () => {
      console.log(`EXPRESS 🎢  Server is ready at http://localhost:${port}`);
    });
  };

  initExpressApp = (): void => {
    // eslint-disable-next-line
    const sentry: Sentry = require('@sentry/node');
    const {
      publicFolderPath, viewEngine, viewFolderPath, sentry: sentryConfig, morgan: morganConfig,
    } = this.config.server;
    this.express = Express();

    this.express.set('view engine', viewEngine);
    this.express.set('views', path.join(__dirname, viewFolderPath));

    if (sentryConfig) {
      const {
        dsn, debug, environment, sampleRate, attachStacktrace,
      } = sentryConfig;
      // Error Handling
      sentry.init({
        dsn,
        debug,
        environment,
        sampleRate,
        attachStacktrace,
      });
      // The request handler must be the first middleware on the app
      this.express.use(sentry.Handlers.requestHandler());
    }

    // TODO update cors policy
    this.express.use(Cors());
    this.express.use(Morgan(morganConfig.format, morganConfig.options));
    this.express.use(Express.json());
    this.express.use(Express.urlencoded({ extended: false }));
    this.express.use(CookieParser());
    this.express.use(Express.static(path.join(path.resolve(), publicFolderPath)));

    this.initDbClient();
    this.initModels();
    this.initPassport();
    this.initRoutes();
    this.initGqlServer(this.express);

    // eslint-disable-next-line
    this.express.use((req: exExpress$Request, res: express$Response, next: express$NextFunction) => {
      res.statusCode = 404;
      res.json({ message: 'not_found' });
    });

    if (sentryConfig) {
      // The error handler must be before any other error middleware
      this.express.use(sentry.Handlers.errorHandler());
    }

    // Optional fallthrough error handler
    // eslint-disable-next-line
    this.express.use((err: Error, req: exExpress$Request, res: express$Response, next: express$NextFunction) => {
      res.statusCode = 500;
      // eslint-disable-next-line no-underscore-dangle
      res.json({ message: 'internal_error', eventId: sentry.getCurrentHub()._lastEventId });
    });
  };

  initDbClient = (): void => {
    this.sequelize = DbClient(this.config.db);
  };

  initModels = (): void => {
    this.models = importModels(this.modelsPath, this.sequelize);
  };

  initPassport = (): void => {
    this.express.use(Passport.initialize());
    Passport.use(LocalPassportStrategy(this.models));
    Passport.use(JwtPassportStrategy());
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

  initGqlServer = (express: express$Application): void => {
    const that = this;
    const serverConf = {
      typeDefs: gqlTypeDefs,
      resolvers: gqlResolvers(this),
    };

    express.use((req: exExpress$Request, res: express$Response, next: express$NextFunction) => {
      if (req.path === that.config.gqlServer.rootPath) {
        return authenticationMiddleware(req, res, next);
      }
      return next();
    });

    if (process.env.NODE_ENV !== 'production') {
      const playgroundServer = new ApolloServer(serverConf);
      playgroundServer.applyMiddleware({ app: express, path: this.config.gqlServer.playgroundPath });
    }

    express.listen({ port: this.config.gqlServer.port }, () => {
      console.log(`GRAPHQL 🚀  Server ready at http://localhost:${that.config.gqlServer.port}${that.config.gqlServer.rootPath}`);
      console.log(`GRAPHQL ✨  Playground server ready at http://localhost:${that.config.gqlServer.port}${that.config.gqlServer.playgroundPath}`);
    });
  }

  registerRoute = (route: string, router: express$Router): void => {
    this.express.use(route, router);
  }
}
