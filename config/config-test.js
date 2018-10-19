// @flow
import { AppSettings } from './config';

module.exports = (settings: AppSettings): AppSettings => {
  const testSettings: AppSettings = settings;

  // testSettings.appServer.hostname = '';
  // testSettings.appServer.port = 0;

  // testSettings.dbServer.hostname = '';
  // testSettings.dbServer.port = 0;

  return testSettings;
};
