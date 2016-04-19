import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/';

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
