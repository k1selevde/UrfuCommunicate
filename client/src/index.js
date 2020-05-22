import React from 'react';
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom'
import {createStore,compose,applyMiddleware} from 'redux'
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/rootReducer'
import App from './App';
import './index.css';

let store = createStore(rootReducer,
    localStorage.getItem('storage') ? JSON.parse(localStorage['storage']) : {},
    applyMiddleware(thunk))
    
store.subscribe(() => {
    localStorage.setItem('storage',JSON.stringify(store.getState()))
})

const app = (
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
