// @flow
import getConfigLocal from './config-local';
import getConfigTest from './config-test';
import getConfigStaging from './config-staging';
import getConfigProduction from './config-production';

class AppServerSettings {
  hostname: string;

  port: number;
}

class DbServerSettings {
  hostname: string;

  port: number;
}

export class AppSettings {
  appServer: AppServerSettings = new AppServerSettings();

  dbServer: DbServerSettings = new DbServerSettings();
}

export const getAppConfig = (): AppSettings => {
  let settings: AppSettings = new AppSettings();

  // Set global default setting.
  // settings.

  switch (process.env.NODE_ENV) {
    case 'local':
      // Set local default setting.
      // settings.
      settings = getConfigLocal(settings);
      break;
    case 'test':
      // Set test default setting.
      // settings.
      settings = getConfigTest(settings);
      break;
    case 'staging':
      // Set staging default setting.
      // settings.
      settings = getConfigStaging(settings);
      break;
    case 'production':
      // Set production default setting.
      // settings.
      settings = getConfigProduction(settings);
      break;
    default:
      throw new Error('NODE_ENV not set or invalid. (expected local, test, staging or production)');
  }
  return settings;
};
