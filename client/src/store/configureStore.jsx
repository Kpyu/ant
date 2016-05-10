import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/';
import DevTools from '../containers/devTools';
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
    compose(
      applyMiddleware(thunk, createLogger()),
      applyMiddleware(thunk),
      DevTools.instrument()
    )
    // applyMiddleware(...middlewares)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
