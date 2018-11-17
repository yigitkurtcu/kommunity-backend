#!/usr/bin/env node
import App from '$/lib/App';

const appConfig: AppConfig = require('$/../scripts/app/config');

const app: App = new App(appConfig);

module.exports = app;
