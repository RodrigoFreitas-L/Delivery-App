import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function DeliveryDetail() {
  const [sellers, setSellers] = useState([]);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState(0);

  console.log(address, addressNumber);

  useEffect(() => {
    const getSellers = async () => {
      try {
        const response = await api.get('/sellers');
        const { data } = response;
        setSellers(data.map((item) => item.name));
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
        >
          { sellers.map((item, index) => (
            <option key={ index } value="item">{ item }</option>
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
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
