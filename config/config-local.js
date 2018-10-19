// @flow
import { AppSettings } from './config';

module.exports = (settings: AppSettings): AppSettings => {
  const localSettings: AppSettings = settings;

  localSettings.appServer.hostname = 'localhost';
  localSettings.appServer.port = 3008;

  localSettings.dbServer.hostname = 'localhost';
  localSettings.dbServer.port = 3306;

  return localSettings;
};
