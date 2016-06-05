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
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Fs from 'fs';
import path from 'path';
import configureStore from '../client/src/store/configureStore';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import renderTpl from './helper/assetsHelper';
import configureRoutes from '../client/src/routes/configureRoutes';
const isDev = process.env.NODE_ENV === 'development';
const beautifyHTML = require('js-beautify').html;
let DEFAULT_SETTINGS = {
  doctype: '<!DOCTYPE html>',
  viewExt: '.jsx',
  beautify: false,
  transformViews: true
};

function renderFullPage(html, initialState) {
  let htmlStr = `<div class="container">${html}</div>
              <script type="text/javascript">
                window.__INITIAL_STATE__ = ${initialState}
              </script>`;
  let tpl = renderTpl(path.resolve(__dirname, 'views', 'index.html'), {
    manifest: path.join(__dirname, '..', 'manifest.json'),
    prepend: '',
    html: htmlStr
  });
  return beautifyHTML(tpl, { indent_size: 2 });
}
function handleRender(ctx) {
  const store = configureStore();
  const history = createMemoryHistory();
  const routes = configureRoutes(history);
  const initialState = JSON.stringify(store.getState());
  // 参考react-router的官方示例编写的server, 使用react-router.match来匹配路由
  // 并用ReactDom.renderToString方法将对应的JSX文件渲染成HTML并且填入FullPage里.
  match({ routes, location: ctx.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      ctx.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      ctx.status(500).send(error.message);
    } else if (renderProps === null) {
      ctx.status(404).send('Not Found');
    } else {
      const html = renderToString(
        <Provider store={store}>
          <RouterContext { ...renderProps } />
        </Provider>);
      ctx.body = renderFullPage(html, initialState);
      ctx.type = 'html';
    }
  });
}
export default function renderApp() {
  return function render(ctx, next) {
    if (ctx.url.indexOf('admin') >= 0) {
      // 这里要返回一个promise
      next();
      return;
    }
    handleRender(ctx);
  };
}
