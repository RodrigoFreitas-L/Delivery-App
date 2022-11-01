import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addToCart, getCartItems, removeItemCart } from '../helpers/userCart';
// teste lint

function Product({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { id, name, price, urlImage } = product;

  useEffect(() => {
    const numberItem = () => {
      const cartItems = getCartItems();
      const filterCartItems = cartItems.filter((items) => items.id === product.id);
      setQuantity(filterCartItems.length);
    };
    numberItem();
  }, [product.id]);

  const addItem = () => {
    addToCart(product);
    setQuantity(quantity + 1);
  };

  const rmItem = () => {
    if (quantity === 0) return false;
    removeItemCart(product);
    setQuantity(quantity - 1);
  };

  const handleOnChange = (value) => {
    if (value < 1) {
      setQuantity(0);
      return false;
    }
    const diff = value - quantity;
    if (diff > 0) {
      for (let i = 0; i < diff; i += 1) {
        addToCart(product);
      }
    } else {
      for (let i = 0; i > diff; i -= 1) {
        removeItemCart(product);
      }
    }
    setQuantity(value);
  };

  return (
    <div key={ id }>
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}

      </p>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {price.replace('.', ',')}

      </p>
      <img
        width="250px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <button
        onClick={ () => addItem() }
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
      >
        +

      </button>
      <input
        min={ 0 }
        onChange={ ({ target: { value } }) => handleOnChange(value) }
        value={ quantity }
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
      />
      <button
        onClick={ () => rmItem() }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
      >
        -

      </button>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  urlImage: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default Product;
