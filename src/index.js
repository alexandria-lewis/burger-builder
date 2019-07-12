import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Now I'll create a new constant which I'll just name app, I'll use parentheses to be able to write multi-line jsx code and then I'll use the browser router opening and closing tag and in between I'll put my app like this.
const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// And now I'll use the app const that I just created down there as an argument to pass it down here in react dom render.
ReactDOM.render( app, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
