import { Store, } from '../middleware/sessionMiddleWare';
import * as moongose from 'mongoose';
export default class RedisStore extends Store {
  public mongodb: any;
  constructor() {
    super();
    this.mongodb = {};
  }

  async get(sessionId: string) {
    let data = await this.mongodb.get(`SESSION:${sessionId}`);
    return JSON.parse(data);
  }

  async set(session: any, opts: any) {
    if (!opts.sid) {
      opts.sid = this.getID(24);
    }
    await this.mongodb.set(`SESSION:${opts.sid}`, JSON.stringify(session));
    return opts.sid;
  }

  async destroy(sessionId: string) {
    return await this.mongodb.del(`SESSION:${sessionId}`);
  }
};
