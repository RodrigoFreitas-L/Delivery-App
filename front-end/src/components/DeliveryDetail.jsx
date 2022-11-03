import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import getUser from '../helpers/user';
import { getCartItems } from '../helpers/userCart';
import api from '../services/api';

export default function DeliveryDetail({ total }) {
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState(0);
  const history = useHistory();

  const getProducts = () => {
    const products = getCartItems();
    const ids = Array.from(new Set(products.map((product) => product.id)));

    const uniqueProducts = ids.map((id) => {
      const quantity = products.filter((product) => product.id === id).length;

      return { productId: id, quantity };
    });

    return uniqueProducts;
  };

  const makeOrder = async () => {
    const products = getProducts();
    const user = getUser();
    const order = {
      userId: user.id,
      totalPrice: Number(total),
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      sellerId,
      products,
    };

    const response = await api.post('/checkout', order, {
      headers: { Authorization: user.token },
    });

    const { orderId } = response.data;

    history.push(`/customer/orders/${orderId}`);
  };

  useEffect(() => {
    const getSellers = async () => {
      try {
        const response = await api.get('/sellers');
        const { data } = response;
        setSellers(data.map((item) => item));
        setSellerId(sellers[0].id);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSellers();
  });

  return (
    <div>
      <h4>Detalhes e Endereço para Entrega</h4>
      <label htmlFor="seller">
        P. Vendedora Responsável:
        {' '}
        <select
          name="seller"
          id="seller"
          data-testid="customer_checkout__select-seller"
          onChange={ ({ target: { value } }) => setSellerId(value) }
        >
          { sellers.map((item, index) => (
            <option key={ index } value={ item.id }>{ item.name }</option>
          )) }
        </select>
      </label>
      <br />

      <label htmlFor="address">
        Endereço:
        {' '}
        <input
          name="address"
          id="address"
          type="text"
          data-testid="customer_checkout__input-address"
          onChange={ ({ target: { value } }) => setAddress(value) }
        />
      </label>
      <br />

      <label htmlFor="address-number">
        Número:
        {' '}
        <input
          name="address-number"
          id="address-number"
          data-testid="customer_checkout__input-address-number"
          type="number"
          onChange={ ({ target: { value } }) => setAddressNumber(value) }
        />
      </label>
      <br />

      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
        onClick={ () => makeOrder() }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

DeliveryDetail.propTypes = {
  total: PropTypes.number,
}.isRequired;
