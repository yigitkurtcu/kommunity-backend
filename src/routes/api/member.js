import uuid from 'uuid';
import express from 'express';
import md5 from 'md5';

import { generateTokenForUser } from '$/lib/token';
import authenticationMiddleware from '$/middlewares/auth';
import { User } from '$/models/sql/user';

const router = express.Router();

router.get('/me', authenticationMiddleware, (req: express$Request, res: express$Response) => {
  return res.json(req.user);
});

router.post('/signup', (req: express$RenderCallback, res: express$Response) => {
  const { email, password } = req.body;
  // TODO handle error, transform response
  User.create({
    uuid: uuid(),
    email,
    password_hash: md5(password),
  }).then((createdUser) => {
    res.json({
      user: createdUser,
      token: generateTokenForUser(createdUser),
    });
  }).catch((err) => {
    res.json({ err });
  });
});

router.post('/login', authenticationMiddleware, (req: express$RenderCallback, res: express$Response) => {
  const { user } = req;
  return res.json({
    user,
    token: generateTokenForUser(user),
  });
});

router.post('/logout', authenticationMiddleware, (req: express$Request, res: express$Response) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
