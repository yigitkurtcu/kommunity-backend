// @flow
import { AppSettings } from './config';

module.exports = (settings: AppSettings): AppSettings => {
  const productionSettings: AppSettings = settings;

  // productionSettings.appServer.hostname = '';
  // productionSettings.appServer.port = 0;

  // productionSettings.dbServer.hostname = '';
  // productionSettings.dbServer.port = 0;

  return productionSettings;
};
