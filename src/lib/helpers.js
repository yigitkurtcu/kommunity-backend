import fs from 'fs';
import path from 'path';
import jwt, { type VerifyCallback } from 'jsonwebtoken';

export const getAllFiles = function(folderPath: string, filelist: Array <string>) {
  const items: Array <string> = fs.readdirSync(folderPath);
  filelist = filelist || [];
  items.forEach(function(item: string) {
    if (fs.statSync(path.join(folderPath, item)).isDirectory()) {
      filelist = getAllFiles(path.join(folderPath, item) , filelist);
    }
    else {
      filelist.push(path.join(folderPath, item));
    }
  });
  return filelist;
};

export const getUserFromToken = (secret: string, token: string, done: (err: boolean, token: ?string) => void) => {
  const cb: VerifyCallback = (err, decodedObject) => {
    if (err) {
      return done(true);
    }
    return done(false, decodedObject.user);
  }
  jwt.verify(token, secret, cb);
};

export const generateTokenForUser = (secret: string, user: {}) => {
  return jwt.sign({
    user,
  }, secret, { expiresIn: 60 * 60 * 24 * 24 });
};
