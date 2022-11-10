import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';

export default function Order() {
  const prefix = 'seller_order_details__';
  const params = useParams();
  const [order, setOrder] = useState();
  const [preparingBtnDisabled, setPreparingBtnDisabled] = useState(true);
  const [dispatchBtnDisabled, setDispatchBtnDisabled] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await api.get(`/seller/orders/${params.id}`);
      setOrder(response.data);

      switch (response.data.status) {
      case 'Pendente':
        setPreparingBtnDisabled(false);
        setDispatchBtnDisabled(true);
        break;
      case 'Preparando':
        setPreparingBtnDisabled(true);
        setDispatchBtnDisabled(false);
        break;
      default:
        setPreparingBtnDisabled(true);
        setDispatchBtnDisabled(true);
      }
    };
    fetchOrder();
  }, [count]);

  async function setPreparingOrder() {
    await api.put(`/seller/orders/${params.id}`, { status: 'Preparando' });
    setCount(count + 1);
  }

  async function setDispatchOrder() {
    await api.put(`/seller/orders/${params.id}`, { status: 'Em Trânsito' });
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
          <p data-testid={ `${prefix}element-order-details-label-order-id` }>
            {`Pedido: ${order.id}`}
          </p>
          <p data-testid={ `${prefix}element-order-details-label-order-date` }>
            {dataAtualFormatada(order.saleDate)}
          </p>
          <p
            data-testid={ `${prefix}element-order-details-label-delivery-status` }
          >
            {order.status}
          </p>
          <button
            data-testid={ `${prefix}button-preparing-check` }
            type="button"
            disabled={ preparingBtnDisabled }
            onClick={ () => setPreparingOrder() }
          >
            Preparar pedido
          </button>
          <button
            data-testid={ `${prefix}button-dispatch-check` }
            type="button"
            disabled={ dispatchBtnDisabled }
            onClick={ () => setDispatchOrder() }
          >
            Saiu para entrega
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
          data-testid={ `${prefix}element-order-total-price` }
        >
          {`Total: ${order.totalPrice.replace('.', ',')}`}
        </p>
      </>)
    : (<h1>Carregando...</h1>);
}
