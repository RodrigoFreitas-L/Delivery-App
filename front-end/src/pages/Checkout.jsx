import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getCartItems, removeItemAll } from '../helpers/userCart';

function Checkout() {
  const [products, setProducts] = useState([]);
  const [noProducts, setNoProducts] = useState(false);
  const [total, setTotal] = useState(0);

  const getListCart = () => {
    const productsCart = getCartItems();
    const setItem = new Set();
    const filterProducts = productsCart.filter((item) => {
      const duplicateItem = setItem.has(item.id);
      setItem.add(item.id);
      return !duplicateItem;
    });
    if (productsCart.length === 0) {
      setNoProducts(false);
    } else {
      setProducts(filterProducts);
      setNoProducts(true);
    }
  };

  const getSubTotal = (item) => {
    const productsCart = getCartItems();
    const countItems = productsCart.filter((cartItem) => cartItem.id === item.id).length;
    return countItems;
  };

  const totalPrice = () => {
    const cartItems = getCartItems();
    const priceTotal = cartItems.reduce((totalP, item) => {
      totalP += Number(item.price);
      return totalP;
    }, 0);
    setTotal(priceTotal.toFixed(2));
  };

  const removeCartItem = (item) => {
    removeItemAll(item);
    getListCart();
    totalPrice();
  };

  useEffect(() => {
    getCartItems();
    getListCart();
    totalPrice();
  }, []);

  return (
    <>
      <Header />
      <table border="1">
        <tbody>
          <tr>
            <td>
              numero
            </td>
            <td>
              nome
            </td>
            <td>
              quantidade
            </td>
            <td>
              unitario
            </td>
            <td>
              sub-total
            </td>
            <td>
              {' '}
            </td>
          </tr>
          { noProducts
        && products.map((item, index) => (
          <tr
            key={ item.id }
            data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
          >
            <td>
              { index + 1 }
            </td>
            <td
              data-testid={ `element-order-table-name-${index}` }
            >
              { item.name }

            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              { getSubTotal(item) }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
            >
              { item.price.toString(2).replace('.', ',') }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
            >
              {
                (getSubTotal(item) * item.price)
                  .toFixed(2)
                  .toString(2)
                  .replace('.', ',')
              }
            </td>
            <td>
              <button
                type="button"
                onClick={ () => removeCartItem(item) }
              >
                Remove

              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        Total:
        {' '}
        { total
          .toString(2)
          .replace('.', ',') }
      </p>
    </>
  );
}

export default Checkout;
