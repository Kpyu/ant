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
export default function (opts: any) {
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
  return async (ctx: any, next: any) => {
    const manifest = require(opts.manifest);
    ctx.state = ctx.state || {};
    ctx.state.assets = (fileName: string) => {
      let output = opts.prepend + fileName;
      output = opts.prepend + (manifest[fileName] || fileName);
      console.log('静态链接：', output);
      return output;
    };
    ctx.state.css = (fileName: string) => {
      let files = manifest[fileName];
      let tmps: any = [];
      if (typeof files === 'object' ||
        Object.prototype.toString.call(files) === '[object Array]') {
        files.forEach((value: string, key: string) => {
          if (/(.css)$/.test(value)) {
            tmps.push(`<link rel="stylesheet" href="${value}"></link>`);
            return;
          }
        });
      } else {
        if (/(.css)$/.test(files)) {
          tmps.push(`<link rel="stylesheet"  href="${files}"></link>`);
        }
      }
      return tmps.join('\n');
    };
    ctx.state.script = (fileName: string) => {
      let scriptUrl = opts.prepend + (manifest[fileName] || fileName);
      return `<script type="text/javascript" src="${scriptUrl}"></script>`;
    };
    ctx.state.vender = (venderName: string) => {
      let tmps: any = [];
      let files = manifest[venderName];
      if (typeof files === 'object' ||
        Object.prototype.toString.call(files) === '[object Array]') {
        files.forEach((value: string, key: string) => {
          if (/(.css)$/.test(value)) {
            tmps.push(`<link rel="stylesheet" href="${value}"></link>`);
            return;
          }
          if (/(.js)$/.test(value)) {
            tmps.push(`<script type="text/javascript" src="${value}"></script>`);
            return;
          }
        });
      } else {
        if (/(.css)$/.test(files)) {
          tmps.push(`<link rel="stylesheet"  href="${files}"></link>`);
        }
        if (/(.js)$/.test(files)) {
          tmps.push(`<script type="text/javascript" src="${files}"></script>`);
        }
      }
      return tmps.join('\n');
    };
    await next();
  };
}
