import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './views/Home';
import PostLogin from './components/PostLogin';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/post-login" component={PostLogin} />
      <Route exact={true} path="/" component={App} />
      <Route exact={true} path="/home" component={Home} />
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
