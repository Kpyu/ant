import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';
const moduleTemp:any = module;
export default function configureStore(initialState):any {
  const store = createStore(
    rootReducer,
    initialState,
    // window.devToolsExtension ? window.devToolsExtension() : undefined,
    compose(
      applyMiddleware(thunk),
      DevTools.instrument()
    )
  );
  if (moduleTemp.hot) {
    moduleTemp.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
