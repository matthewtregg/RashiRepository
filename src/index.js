import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware} from 'redux';
import reducers from './Redux/reducers';
import { api } from './Redux/middleware/api'

ReactDOM.render(
<Provider store={createStore(reducers,applyMiddleware(api))}>
<App/>
</Provider>
, document.getElementById('root'));

