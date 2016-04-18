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
import App from '../client/src/app.jsx';
import routes from '../client/src/routes/RootRoute';

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
        <script src="/assets/app.js"></script>
      </body>
    </html>
    `;
}
function handleRender(ctx) {
  const store = configureStore();
  const initialState = JSON.stringify(store.getState());
  // 参考react-router的官方示例编写的server, 使用react-router.match来匹配路由
  // 并用ReactDom.renderToString方法将对应的JSX文件渲染成HTML并且填入FullPage里.
  match({ routes, location: ctx.url }, (error, redirectLocation, renderProps) => {
    // would be valid when using redux-auth-wrapper?? or onEnter from react-router?
    if (redirectLocation) {
      ctx.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      ctx.status(500).send(error.message);
    } else if (renderProps === null) {
      // not matching a route from the React routes
      ctx.status(404).send('Not Found');
    } else {
      const html = renderToString(
        <Provider store={store}>
          <RouterContext { ...renderProps } />
        </Provider>
      );
      console.log(initialState);
      console.log('server state');
      ctx.send(renderFullPage(html, initialState));
    }
  });
}

export default function renderApp(ctx) {
  ctx.body = handleRender(ctx);
  ctx.type = 'html';
}
