import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';

export default function CustomerOrderDetails() {
  const prefix = 'customer_order_details__';
  const params = useParams();
  const [order, setOrder] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await api.get(`/customer/orders/${params.id}`);
      setOrder(response.data);
    };
    fetchOrder();
  }, [count]);

  async function setDeliveredOrder() {
    await api.put(`/seller/orders/${params.id}`, { status: 'Entregue' });
    setCount(count + 1);
  }

  function dataAtualFormatada(date) {
    const data = new Date(date);
    const dia = data.getDate().toString();
    const diaF = (dia.length === 1) ? `0${dia}` : dia;
    const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
    const mesF = (mes.length === 1) ? `0${mes}` : mes;
    const anoF = data.getFullYear();
    return `${diaF}/${mesF}/${anoF}`;
  }

  return order
    ? (
      <>
        <Header />
        <h1>Detalhe do Pedido</h1>
        <div>
          <p data-testid="customer_order_details__element-order-details-label-order-id">
            {`Pedido: ${order.id}`}
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            Vend:
            {' '}
            {order.seller.name}

          </p>
          <p data-testid="customer_order_details__element-order-details-label-order-date">
            {dataAtualFormatada(order.saleDate)}
          </p>
          <p
            data-testid={ `${prefix}element-order-details-label-delivery-status` }
          >
            {order.status}
          </p>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled={ order.status !== 'Em Trânsito' }
            onClick={ () => setDeliveredOrder() }
          >
            Marcar como entregue
          </button>

        </div>
        <table border="1">
          <tbody>
            <tr>
              <td>
                numero
              </td>
              <td>
                nome
              </td>
              <td>
                quantidade
              </td>
              <td>
                unitario
              </td>
              <td>
                sub-total
              </td>
            </tr>
            {order.products.map((item, index) => (
              <tr
                key={ item.id }
                data-testid={ `${prefix}element-order-table-item-number-${index}` }
              >
                <td>
                  {index + 1}
                </td>
                <td
                  data-testid={ `${prefix}element-order-table-name-${index}` }
                >
                  {item.name}

                </td>
                <td
                  data-testid={ `${prefix}element-order-table-quantity-${index}` }
                >
                  {item.SalesProduct.quantity}
                </td>
                <td
                  data-testid={ `${prefix}element-order-table-unit-price-${index}` }
                >
                  {item.price.replace('.', ',')}
                </td>
                <td
                  data-testid={ `${prefix}element-order-table-sub-total-${index}` }
                >
                  {
                    (Number(item.price) * item.SalesProduct.quantity)
                      .toFixed(2).replace('.', ',')
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p
          data-testid="customer_order_details__element-order-total-price"
        >
          {`Total: ${order.totalPrice.replace('.', ',')}`}
        </p>
      </>)
    : (<h1>Carregando...</h1>);
}
