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
/**
 * @param {string} path 模板文件路径
 * @param {object} manifest 静态文件映射表
 * @return {string} 渲染之后的模板
 */
import ejs from 'ejs';
import fs from 'fs';
export default function assetsHelper(path, opts) {
  // 读取模板文件
  let tpl = fs.readFileSync(path, 'utf8');
  let renderData = {};
  if (typeof opts !== 'object') {
    throw new Error('`options` argument required');
  }

  if (typeof opts.manifest !== 'string') {
    throw new Error('`manifest` property is required');
  }

  if (typeof opts.prepend !== 'undefined' && typeof opts.prepend !== 'string') {
    throw new Error('`prepend` property defined, but it was not a string');
  }
  opts.prepend = opts.prepend || '';

  const manifest = require(opts.manifest);

  renderData.assetsUrl = fileName => {
    let output = opts.prepend + fileName;
    output = opts.prepend + (manifest[fileName] || fileName);
    console.log('静态链接：', output);
    return output;
  };

  renderData.css = fileName => {
    var tmps = [];
    var files = manifest[fileName];
    if (typeof files === 'object' ||
      Object.prototype.toString.call(files) === '[object Array]') {
      files.forEach(function (value, key) {
        if (/(.css)$/.test(value)) {
          tmps.push(`<link rel="stylesheet" type="text/css"="${value}" />`);
          return;
        }
      });
    } else {
      if (/(.css)$/.test(files)) {
        tmps.push(`<link rel="stylesheet" type="text/css" href="${files}">`);
      }
    }
    return tmps.join('');
  };
  renderData.script = fileName => {
    var tmps = [];
    var files = manifest[fileName];
    if (typeof files === 'object' ||
      Object.prototype.toString.call(files) === '[object Array]') {
      files.forEach(function (value, key) {
        if (/(.js)$/.test(value)) {
          tmps.push(`<script typeof="text/javascript" src="${value}"></script>`);
          return;
        }
      });
    } else {
      if (/(.js)$/.test(files)) {
        tmps.push(`<script typeof="text/javascript" src="${files}"></script>`);
      }
    }
    return tmps.join('');
  };
  renderData.vender = venderName => {
    var tmps = [];
    var files = manifest[venderName];
    if (typeof files === 'object' ||
      Object.prototype.toString.call(files) === '[object Array]') {
      files.forEach(function (value, key) {
        if (/(.css)$/.test(value)) {
          tmps.push(`<link rel="stylesheet" type="text/css" href="${value}">`);
          return;
        }
        if (/(.js)$/.test(value)) {
          tmps.push(`<script typeof="text/javascript" src="${value}"></script>`);
          return;
        }
      });
    } else {
      if (/(.css)$/.test(files)) {
        tmps.push(`<link rel="stylesheet" type="text/css" href="${files}">`);
      }
      if (/(.js)$/.test(files)) {
        tmps.push(`<script typeof="text/javascript" src="${files}"></script>`);
      }
    }
    return tmps.join('\n');
  };
  renderData.html = opts.html;
  return ejs.render(tpl, renderData);
}
