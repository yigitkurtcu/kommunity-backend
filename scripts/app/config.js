import path from 'path';

const env = process.env.NODE_ENV || '';
const allowedEnvs = ['development', 'test', 'staging', 'production'];
const appConfigsPath= path.resolve('configs/app');
if (allowedEnvs.indexOf(env) === -1) { throw new Error(`Invalid environment value.`); }
const config: AppConfig = require(path.join(appConfigsPath, `${env}.json`));
config.env.current = env;

if(config.env.current === 'production') {
  for (let propertyName in config.appServer.secrets) {
    if (!process.env['NODE_SECRET_' + propertyName]) { throw new Error(`"process.env.NODE_SECRET_${propertyName}" property not found.`); }
    config.appServer.secrets[propertyName] = process.env['NODE_SECRET_' + propertyName]
  }
}

module.exports = config

