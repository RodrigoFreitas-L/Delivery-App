import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Product from '../components/Product';
import { getCartItems } from '../helpers/userCart';
import api from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartBtn, setCartBtn] = useState(true);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('userCart'))) {
      localStorage.setItem('userCart', JSON.stringify([]));
    }
    const data = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };
    data();

    const disableCheckout = () => {
      if (Number(total) !== 0) {
        setCartBtn(false);
      } else {
        setCartBtn(true);
      }
    };

    const totalPrice = () => {
      const cartItems = getCartItems();
      const priceTotal = cartItems.reduce((totalP, item) => {
        totalP += Number(item.price);
        return totalP;
      }, 0);
      setTotal(priceTotal.toFixed(2));
    };
    disableCheckout();
    totalPrice();
  });

  return (
    <div>
      <Header />
      { products.map((item) => (
        <Product
          key={ item.id }
          product={ item }
        />
      )) }
      <h3
        data-testid="customer_products__checkout-bottom-value"
      >
        {total.toString(2).replace('.', ',')}

      </h3>
      <Link to="/customer/checkout">
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ cartBtn }
        >
          Carrinho

        </button>
      </Link>
    </div>
  );
}

export default Products;
