import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './store/reducers/';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import root from './store/saga';

const sagaMiddleware =createSagaMiddleware();

const store = createStore(reducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(root);

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

