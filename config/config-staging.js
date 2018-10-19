// @flow
import { AppSettings } from './config';

module.exports = (settings: AppSettings): AppSettings => {
  const stagingSettings: AppSettings = settings;

  // stagingSettings.appServer.hostname = '';
  // stagingSettings.appServer.port = 0;

  // stagingSettings.dbServer.hostname = '';
  // stagingSettings.dbServer.port = 0;

  return stagingSettings;
};
