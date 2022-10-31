import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos

      </Link>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Pedidos

      </Link>
      <h4 data-testid="customer_products__element-navbar-user-full-name">{user.name}</h4>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        Logout

      </button>
    </div>
  );
}

export default Header;
