/* eslint-disable no-console */
import path from 'path';
import Sequelize from 'sequelize';
import DbClient, { importModels } from '$/lib/db-client';

const appConfig: AppConfig = require('$/config');

const dbClient: Sequelize = DbClient(appConfig.dbClient);
const modelsPath = path.join(__dirname, '../../src/models');
importModels(modelsPath, dbClient);

dbClient.sync({ force: true, match: /-development$/ }).then(() => {
  console.log('\n>>> DB TABLE SETUP IS COMPLETED\n');
  process.exit();
}).catch((err) => {
  console.log('\n>>> DB TABLE SETUP FAILED!!!\n');
  console.log(err);
  process.exit(1);
});
