// https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import AuthService from '../helpers/user';

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = AuthService();

  return (
    <Route
      { ...rest }
      render={ (props) => (isLoggedIn ? (
        <Component { ...props } />
      ) : (
        <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
      )) }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.shape({}),
}.isRequired;

export default PrivateRoute;
