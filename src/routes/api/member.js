import express from 'express';
import { generateTokenForUser } from '$/lib/token';
import authenticationMiddleware from '$/middlewares/auth';

const router = express.Router();

router.get('/me', authenticationMiddleware, (req: express$Request, res: express$Response) => {
  return res.json(req.user);
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
