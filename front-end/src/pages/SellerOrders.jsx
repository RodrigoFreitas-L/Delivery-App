import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';
import user from '../helpers/user';

export default function SellerOrders() {
  const [{ sellerOrders }, setState] = useState({
    sellerOrders: [],
  });

  function dataAtualFormatada(date) {
    const data = new Date(date);
    const dia = data.getDate().toString();
    const diaF = (dia.length === 1) ? `0${dia}` : dia;
    const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
    const mesF = (mes.length === 1) ? `0${mes}` : mes;
    const anoF = data.getFullYear();
    return `${diaF}/${mesF}/${anoF}`;
  }

  useEffect(() => {
    api.get(`seller/orders?userId=${user().id}`).then((response) => {
      setState((state) => ({
        ...state,
        sellerOrders: [...response.data.sales],
      }));
    });
  }, []);

  return (
    <>
      <Header />
      {sellerOrders.map(({ id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber }) => (
        <Link to={ `/seller/orders/${id}` } key={ id }>
          <div className="card">
            <div
              data-testid={ `seller_orders__element-order-id-${id}` }
            >
              {id}
            </div>
            <div
              data-testid={ `seller_orders__element-delivery-status-${id}` }
            >
              {status}
            </div>

            <div
              data-testid={ `seller_orders__element-card-address-${id}` }
            >
              {`${deliveryAddress}, ${deliveryNumber}`}
            </div>
            <div className="card-date-price">
              <div
                data-testid={ `seller_orders__element-order-date-${id}` }
              >
                {dataAtualFormatada(saleDate)}
              </div>
              <div
                data-testid={ `seller_orders__element-card-price-${id}` }
              >
                {totalPrice.replace('.', ',')}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
