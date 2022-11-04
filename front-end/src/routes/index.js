import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import Order from '../pages/Order';
import UserOrders from '../pages/UserOrders';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <PrivateRoute exact path="/customer/products" component={ Products } />
      <PrivateRoute exact path="/customer/checkout" component={ Checkout } />
      <PrivateRoute exact path="/customer/orders/:id" component={ Order } />
      <PrivateRoute exact path="/customer/orders" component={ UserOrders } />
      <Redirect exact from="/" to="/login" />
    </Switch>

  );
}

export default Routes;
