import request from 'axios';
import mainAction from './actions';

const actions = { ...mainAction };
class Api {
  constructor(http) {
    this.http = http;
    this.initApi();
  }
  initApi() {
    let self = this;
    Object.keys(actions).forEach(function (key) {
      self[key] = function (params) {
        return request({
          timeout: 20000,
          url: actions[key].url,
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          method: actions[key].method.toLowerCase(),
          data: actions[key].method.toLowerCase() === 'post' ? params : null,
          params: actions[key].method.toLowerCase() === 'get' ? params : null,
          responseType: actions[key].dataType || 'json'
        });
      };
    });
  }
}
export const api = new Api(request);
