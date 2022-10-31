import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const totalPrice = (item, quantityP) => {
    setTotal(item * quantityP);
  };

  const addItem = (item, quantityA) => {
    setQuantity(quantity + 1);
    totalPrice(Number(item), quantityA);
  };

  const rmItem = (item, quantityR) => {
    if (quantity === 0) return false;
    setQuantity(quantity - 1);
    totalPrice(Number(item), quantityR);
  };

  useEffect(() => {
    const data = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };
    data();
  }, []);

  return (
    <div>
      <Header />
      { products.map((item) => (
        <div key={ item.id }>
          <p
            data-testid={ `customer_products__element-card-title-${item.id}` }
          >
            {item.name}

          </p>
          <p
            data-testid={ `customer_products__element-card-price-${item.id}` }
          >
            {item.price}

          </p>
          <img
            data-testid={ `customer_products__img-card-bg-image-${item.id}` }
            src={ item.urlImage }
            alt={ item.name }
          />
          <button
            onClick={ () => addItem(item.price, quantity) }
            data-testid={ `customer_products__button-card-add-item-${item.id}` }
            type="button"
          >
            +

          </button>
          <input
            onChange={ ({ target: { value } }) => setQuantity(value) }
            value={ quantity }
            data-testid={ `customer_products__input-card-quantity-${item.id}` }
            type="number"
          />
          <button
            onClick={ () => rmItem(item.price, quantity) }
            data-testid={ `customer_products__button-card-rm-item-${item.id}` }
            type="button"
          >
            -

          </button>
        </div>
      )) }
      <h3>{total}</h3>
    </div>
  );
}

export default Products;
