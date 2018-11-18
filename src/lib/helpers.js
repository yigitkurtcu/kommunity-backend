import fs from 'fs';
import path from 'path';
import jwt, { type VerifyCallback } from 'jsonwebtoken';

export const getAllFiles = (folderPath: string, filelist: Array<string>) => {
  const items: Array<string> = fs.readdirSync(folderPath);
  let files: Array<string> = filelist || [];
  items.forEach((item: string) => {
    if (fs.statSync(path.join(folderPath, item)).isDirectory()) {
      files = getAllFiles(path.join(folderPath, item), files);
    } else {
      files.push(path.join(folderPath, item));
    }
  });
  return files;
};

export const getUserFromToken = (secret: string, token: string, done: (err: boolean, token: ?string) => void) => {
  const cb: VerifyCallback = (err, decodedObject) => {
    if (err) {
      return done(true);
    }
    return done(false, decodedObject.user);
  };
  jwt.verify(token, secret, cb);
};

export const generateTokenForUser = (secret: string, user: {}) => {
  return jwt.sign({
    user,
  }, secret, { expiresIn: 60 * 60 * 24 * 24 });
};
