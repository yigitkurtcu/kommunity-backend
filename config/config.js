// @flow
export const getAppConfig = (): AppSettings => {
  const env: string = process.env.NODE_ENV || '';
  const allowedEnvs: string[] = ['local', 'test', 'staging', 'production'];
  if (allowedEnvs.indexOf(env) === -1) {
    throw new Error('Invalid environment value');
  }
  return require(`./config/${env}.json`);
};
