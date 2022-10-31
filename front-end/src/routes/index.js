import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/:host/products" component={ Products } />
      <Redirect exact from="/" to="/login" />
    </Switch>

  );
}

export default Routes;
