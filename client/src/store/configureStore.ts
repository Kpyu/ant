import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';
const logger = createLogger({
  level: 'info',
  collapsed: false,
  logger: console
});

const middlewares = [promiseMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    // window.devToolsExtension ? window.devToolsExtension() : undefined,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
