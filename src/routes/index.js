import memberRouter from './api/member';

export const initializeRoutes = (app: express$Application) => {
  app.use('/api/v1/member', memberRouter);

  app.get('/health', (req: express$Request, res: express$Response) => {
    res.end('OK');
  });
};
