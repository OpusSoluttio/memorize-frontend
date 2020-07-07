import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Game from "../src/pages/Game/Game";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


const Routes = (
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <Switch>
        <Route exact path="/game" component={Game}/>
        <Route exact path="/" component={Home}/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(Routes , document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
