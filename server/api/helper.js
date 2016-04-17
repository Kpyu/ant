//   神兽护体
//   ┏┓       ┏┓
//  ┏┛┻━━━━━━━┛┻┓
//  ┃           ┃
//  ┃     ━     ┃
//  ┃  ┳┛   ┗┳  ┃
//  ┃           ┃
//  ┃```  ┻  ```┃
//  ┃           ┃
//  ┗━┓      ┏━━┛
//    ┃      ┃   Code is far away from bug with the animal protecting.
//    ┃      ┃   神兽护佑,代码无bug.
//    ┃      ┗━━━┓
//    ┃          ┣┓
//    ┃          ┏┛
//    ┗┓┓┏━━┳┓┏━━┛
//     ┃┫┫  ┃┫┫
//     ┗┻┛  ┗┻┛
export default class Util {
  /**
   * 分页工具
   * @param {Object} model 分页实体
   * @param {Object} pageInfo 分页参数
   * @param {Object} queryInfo 附带查询参数
   */
  static Pagination(model, pageInfo, queryInfo) {
    return new Promise((resolver, reject) => {
      let paging = Object.assign({}, {
        currentPage: 1, // 当前页
        pageSize: 10,
        count: 0 // 总页数
      });
      let query = Object.assign({}, {
        where: {}
      }, queryInfo);
      model.query(paging, query)
        .then(count => {})
        .then(result => {

        }, err => {

        });
    });
  }
  static isArray(param) {
    return typeof param === 'object' && Object.prototype.toString.call(param) === '[object Array]';
  }
  static guid() {
    let r;
    let v;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      r = Math.random() * 16 | 0;
      v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
