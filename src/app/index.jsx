import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import configureStore from './common/configureStore';
import buildRoutes from './routes';

import './styles/global.scss';

const initialState = window.INITIAL_STATE;
const store = configureStore(initialState, routerMiddleware(browserHistory));
const routes = buildRoutes();

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing').toJS()
});

const root = document.getElementById('root');
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
    <Router routes={routes} history={history}/>
  </Provider>, root);
};

document.addEventListener('DOMContentLoaded', render, false);
