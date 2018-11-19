import uuid from 'uuid';
import express from 'express';
import md5 from 'md5';
import authenticationMiddleware from '$/middlewares/auth';
import type App from '$/lib/app';
import { generateTokenForUser } from '$/passport-auth/lib';

const routes = (app: App): void => {
  const router: express$Router = express.Router();

  router.get('/me', authenticationMiddleware, (req: exExpress$Request, res: express$Response) => {
    return res.json(req.user);
  });

  router.post('/signup', (req: exExpress$Request, res: express$Response) => {
    const { email, password } = req.body;
    // TODO handle error, transform response
    app.models.User.create({
      uuid: uuid(),
      email,
      passwordHash: md5(password),
    }).then((createdUser) => {
      res.json({
        user: createdUser,
        token: generateTokenForUser(createdUser),
      });
    }).catch((err) => {
      res.json({ err });
    });
  });

  router.post('/login', authenticationMiddleware, (req: exExpress$Request, res: express$Response) => {
    const { user } = req;
    return res.json({
      user,
      token: generateTokenForUser(user),
    });
  });

  router.post('/logout', authenticationMiddleware, (req: exExpress$Request, res: express$Response) => {
    req.logout();
    res.json({ success: true });
  });

  app.registerRoute('/api/v1/member', router);
};

module.exports = routes;
