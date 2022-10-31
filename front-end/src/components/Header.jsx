import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
      <h4 data-testid="customer_products__element-navbar-user-full-name">Teste</h4>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Logout

      </button>
    </div>
  );
}

export default Header;
