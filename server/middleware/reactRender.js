import React from 'react';
import path from 'path';
import assign from 'object-assign';
import co from 'co';
import { renderToString } from 'react-dom/server';

const beautifyHTML = require('js-beautify').html;
const ReactDOMServer = require('react-dom/server');
let DEFAULT_SETTINGS = {
  doctype: '<!DOCTYPE html>',
  viewExt: '.jsx',
  beautify: false,
  transformViews: true
};

export default function reactRender(app, settings) {
  if (app.context.renderReact) {
    return;
  }
  settings = assign({}, DEFAULT_SETTINGS, settings || {});

  settings.root = path.resolve(process.cwd(), settings.root || './views');

  if (settings.transformViews) {
    require('babel-core/register')({
      only: settings.root
    });
  }

  // const moduleDetectRegEx = new RegExp('^' + settings.root);
  // function renderApp(props, res) {
  //   const markup = renderToString(<RoutingContext {...props}/>);
  //   const html = createPage(markup);
  //   write(html, 'text/html', res);
  // }
  /**
   * Render html using view and props
   * @param {String} view 视图路径
   * @param {Object} props 配置属性
   * @return {String} html 渲染结果
   */
  function* render(view, props) {
    view += settings.viewExt;
    let viewPath = path.join(settings.root, view);
    let html = settings.doctype;
    let component = require(viewPath);
    // Transpiled ES6 may export components as { default: Component }
    component = component.default || component;


    html += ReactDOMServer.renderToStaticMarkup(
      React.createElement(component, props)
    );

    if (settings.beautify) {
      // NOTE: This will screw up some things where whitespace is important, and
      // be subtly different than prod.
      html = beautifyHTML(html);
    }

    if (app.env === 'development') {
      // Remove all files from the module cache that are in the view folder.
      Object.keys(require.cache).forEach(function (module) {
        if (moduleDetectRegEx.test(module)) {
          delete require.cache[module];
        }
      });
    }

    return html;
  }
  console.log('添加react渲染器');
  console.log(JSON.stringify(app));
  app.context.react = function* (view, _context) {
    let context = {};
    console.log('_context', view);
    assign(context, this.state);
    assign(context, _context);

    let html = yield* render(view, context);
    this.type = 'html';
    this.body = html;
    return html;
  };
}
