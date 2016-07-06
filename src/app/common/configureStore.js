import reducer from '../reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';
/**
 * Method to configure default store
 *
 * @param initial - default store state
 * @returns configured redux store
 */
const configure = (initial, ...midlewares) => {
  const store = createStore(reducer, initial, compose(
		// thunk, promise and rest of middlewares
    applyMiddleware(thunk, promise, ... midlewares),

		// configure dev tools for browser
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ?
    window.devToolsExtension() :
    f => f
  ));

  return store;
};

export default configure;
