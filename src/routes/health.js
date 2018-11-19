import type App from '$/lib/app';
import express from 'express';

const routes = (app: App): express$Router => {
  const router: express$Router = express.Router();

  router.get('/health', (req: exExpress$Request, res: express$Response) => {
    res.end('OK');
  });

  app.registerRoute('/', router);
  return router;
};

module.exports = routes;
