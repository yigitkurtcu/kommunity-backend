import config from 'config';

const env = process.env.NODE_ENV || '';
const allowedEnvs = ['development', 'test', 'staging', 'production'];

if (allowedEnvs.indexOf(env) === -1) {
  throw new Error('Invalid environment value.');
}

module.exports = config;
