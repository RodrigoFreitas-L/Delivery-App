import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
import user from '../helpers/user';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import Order from '../pages/Order';
import UserOrders from '../pages/UserOrders';

function Routes() {
  function renderRouter(props) {
    if (user()) {
      return <Redirect to="/customer/products" />;
    }
    return <Login { ...props } />;
  }
  return (
    <Switch>
      <Route exact path="/login" render={ (props) => renderRouter(props) } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders/:id" component={ Order } />
      <Route exact path="/customer/orders" component={ UserOrders } />
    </Switch>

  );
}

export default Routes;
