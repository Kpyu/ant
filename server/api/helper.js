/**
 * 分页工具
 * @param {Object} model 分页实体
 * @param {Object} pageInfo 分页参数
 * @param {Object} queryInfo 附带查询参数
 */
export function Pagination(model, pageInfo, queryInfo) {
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
      .then(count => {
      })
      .then(result => {

      }, err => {

      });
  });
}
