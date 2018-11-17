#!/usr/bin/env node
import App from '$/lib/app';

const appConfig: AppConfig = require('$/../scripts/app/config');

const app: App = new App(appConfig);

module.exports = app;
