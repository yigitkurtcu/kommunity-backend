import { type Options as SequelizeOptions } from "sequelize";

declare module 'config' {
  declare module.exports: any;
}

declare module '$/../scripts/app/config' {
  declare module.exports: any;
}
declare module '$/lib/App' {
  declare module.exports: any;
}
declare type AppConfigEnv = {
  current: string
};

declare type AppServerSentryConfig = {
  dsn: string,
  debug: boolean,
  environment: string,
  sampleRate: number,
  attachStacktrace: boolean
};
declare type AppServerMorganConfig = {
  format: string,
  options?: {}
};
declare type AppServerSecretsConfig = {
  jwt: string
};
declare type AppServerConfig = {
  port: number | string,
  hostname: string,
  secrets: AppServerSecretsConfig,
  sentry: AppServerSentryConfig,
  morgan: AppServerMorganConfig,
  viewEngine: string,
  viewFolderPath: string,
  publicFolderPath: string
};
declare type AppGqlServerConfig = {
  port: number | string,
  rootPath: string,
  playgroundPath: string
};
declare type AppConfig = {
  server: AppServerConfig,
  db: SequelizeOptions,
  gqlServer: AppGqlServerConfig
};
declare type AppUser = {
  id: string
};

declare type AppModels = {
  User: any,
  Community: any,
  CommunityUser: any,
  ConversationCategory: any,
  ConversationPost: any,
  Upload: any
};

declare class exExpress$Request extends express$Request {
  // Community flow-typed custom methods
  // body: mixed;
  body: any;
  user: AppUser;
  logout: () => void;
  isAuthenticated: () => boolean;
}
