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
        <div
          key={ item.id }
          data-testid={ `customer_products__element-card-price-${item.id}` }
        >
          <p>{item.name}</p>
          <p>{item.price}</p>
          <img src={ item.urlImage } alt={ item.name } />
        </div>
      )) }
    </div>
  );
}

export default Products;
