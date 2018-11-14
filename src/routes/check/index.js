
import type App from '$/../lib/App';

const routes = (app: App): express$Router => {
  const rootPath: string = '/';
  const router: express$Router = app.createRouter();

  router.get('/health', (req: express$Request, res: express$Response) => {
    res.end('OK');
  });

  app.express.use(rootPath, router);
  return router;
};

module.exports = routes;
