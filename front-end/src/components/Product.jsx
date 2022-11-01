import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Product({ product, totalPrice }) {
  const [quantity, setQuantity] = useState(0);
  const { id, name, price, urlImage } = product;

  // const { totalPrice } = total;
  // console.log(totalPrice);

  const addItem = (priceAdd, quantityAdd) => {
    setQuantity(quantity + 1);
    totalPrice(Number(priceAdd), quantityAdd);
  };

  const rmItem = (priceRm, quantityRm) => {
    if (quantity === 0) return false;
    setQuantity(quantity - 1);
    totalPrice(Number(priceRm), quantityRm);
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
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <button
        onClick={ () => addItem(price, quantity) }
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
      >
        +

      </button>
      <input
        onChange={ ({ target: { value } }) => setQuantity(value) }
        value={ quantity }
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
      />
      <button
        onClick={ () => rmItem(price, quantity) }
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
