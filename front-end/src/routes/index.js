import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
import getUser from '../helpers/user';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import CustomerOrderDetails from '../pages/CustomerOrderDetails';
import SellerOrderDetails from '../pages/SellerOrderDetails';
import UserOrders from '../pages/UserOrders';
import SellerOrders from '../pages/SellerOrders';

function Routes() {
  function renderRouter(props) {
    const user = getUser();
    switch (user?.role) {
      case 'customer':
        return <Redirect to="/customer/products" />;
      case 'seller':
        return <Redirect to="/seller/orders" />;
      case 'administrator':
        return <Redirect to="/admin/manage" />;
      default:
        return <Login { ...props } />;
    }
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
      <Route exact path="/customer/orders/:id" component={ CustomerOrderDetails } />
      <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
      <Route exact path="/customer/orders" component={ UserOrders } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
    </Switch>

  );
}

export default Routes;
