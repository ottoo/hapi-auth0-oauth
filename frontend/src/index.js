import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Redirect, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import App from './App';
import Home from './views/Home';
import PostLogin from './components/PostLogin';
import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact={true} path="/post-login" component={PostLogin} />
      <Route exact={true} path="/" component={App} />
      <Route exact={true} path="/home" component={Home} />
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.getElementById('root')
);
