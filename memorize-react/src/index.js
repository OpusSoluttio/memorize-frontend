import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Game from "../src/pages/Game/Game";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


const Routes = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/memorize-frontend/game" component={Game}/>
        <Route exact path="/memorize-frontend/" component={Home}/>
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(Routes , document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
