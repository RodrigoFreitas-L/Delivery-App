import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Product from '../components/Product';
import api from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const totalPrice = (item, quantityP) => {
    setTotal(item * quantityP);
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
        <Product
          key={ item.id }
          product={ item }
          totalPrice={ totalPrice }
        />
      )) }
      <h3>{total}</h3>
    </div>
  );
}

export default Products;
