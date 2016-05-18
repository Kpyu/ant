import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
export default class AppModules {
  static initMongoDB() {

  }
  static initInterceptors(app) {
    const dir = path.resolve(__dirname, './interceptors');
    var files = fs.readdirSync(dir).filter((file) => ((file.endsWith('Interceptor.js'))));
    for (let file of files) {
      const interceptor = require(path.resolve(dir, file));
      interceptor.handle(app);
    }
  }
}
