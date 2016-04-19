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
import configureStore from '../client/src/store/configureStore';
import { RouterContext, match, createMemoryHistory } from 'react-router';
// import App from '../client/src/app.jsx';
import configureRoutes from '../client/src/routes';
const isDev = process.env.NODE_ENV === 'development';
const beautifyHTML = require('js-beautify').html;
let DEFAULT_SETTINGS = {
  doctype: '<!DOCTYPE html>',
  viewExt: '.jsx',
  beautify: false,
  transformViews: true
};

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="http://127.0.0.1:4000/assets/vendor.js"></script>
        <script src="http://127.0.0.1:4000/assets/app.js"></script>
      </body>
    </html>
    `;
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
      console.log(initialState);
      console.log('server state');
      ctx.body = renderFullPage(html, initialState);
      ctx.type = 'html';
    }
  });
}

export default function renderApp() {
  return function render(ctx, next) {
    // 这里要返回一个promise
    handleRender(ctx);
  };
}
