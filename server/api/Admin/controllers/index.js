
import path from 'path';
import { readdirSync } from 'fs';
export default function registerControllers(router) {
  readdirSync(__dirname)
    .filter((fileName) => fileName.endsWith('Controller.js'))
    .forEach((fileName) => {
      const ctrlFilePath = path.join(__dirname, fileName);
      require(ctrlFilePath).default(router);
    });
}
