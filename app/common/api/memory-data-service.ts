/**
 * mock 数据
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb = () => {
    let users: Array<any> = [
      { name: '张三', email: '123@qq.com', id: '1' },
      { name: '张三', email: '123@qq.com', id: '2' },
      { name: '张三', email: '123@qq.com', id: '3' },
      { name: '张三', email: '123@qq.com', id: '4' },
      { name: '张三', email: '123@qq.com', id: '5' },
      { name: '张三', email: '123@qq.com', id: '6' },
    ];
    return { users };
  }
}
