import React from 'react';
import { useParams } from 'react-router-dom';

function Products() {
  const { host } = useParams();

  return (
    <h1>{host}</h1>
  );
}

export default Products;
