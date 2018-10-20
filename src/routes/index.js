import memberRouter from './member';

export const initializeRoutes = (app: express$Application) => {
  app.use('/member', memberRouter);
  app.get('/health', (req: express$Request, res: express$Response) => {
    res.end('OK');
  });
};

export const initializeErrorRoutes = (app: express$Application) => {
  app.use((req: express$Request, res: express$Response) => res.status(404).send());

  // error handler
  app.use((err: Error, req: express$Request, res: express$Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    return res.status(500).send(err);
  });
};
