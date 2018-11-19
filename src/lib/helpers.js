import fs from 'fs';
import path from 'path';

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
