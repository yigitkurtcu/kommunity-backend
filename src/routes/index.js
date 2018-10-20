import memberRouter from './member';

export const initializeRoutes = (app:any) => {
  app.use('/member', memberRouter);
  app.get('/health', (req, res) => {
    res.end('OK');
  });
};

export const initializeErrorRoutes = (app:any) => {
  app.use((req:any, res:any) => res.status(404).send());

  // error handler
  app.use((err:any, req:any, res:any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    return res.status(err.status || 500).send(err);
  });
};
