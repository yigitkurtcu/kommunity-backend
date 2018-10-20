export const isAuthenticated = (req: express$Request, res: express$Response, next: express$NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ error: 'unauthorized' }).end();
  }
};
