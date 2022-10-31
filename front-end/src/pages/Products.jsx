import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);

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
            data-testid={ `customer_products__button-card-add-item-${item.id}` }
            type="button"
          >
            +

          </button>
          <input
            data-testid={ `customer_products__input-card-quantity-${item.id}` }
            type="number"
          />
          <button
            data-testid={ `customer_products__button-card-rm-item-${item.id}` }
            type="button"
          >
            -

          </button>
        </div>
      )) }
    </div>
  );
}

export default Products;
