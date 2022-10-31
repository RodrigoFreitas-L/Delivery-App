import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Customer from '../pages/Customer';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Customer } />
      <Redirect exact from="/" to="/login" />
    </Switch>

  );
}

export default Routes;
