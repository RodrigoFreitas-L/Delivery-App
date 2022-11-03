import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';

export default function Order() {
  const params = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      console.log('oi');
      const response = await api.get(`/customer/orders/${params.id}`);
      console.log('opa');
      setOrder(response.data);
      console.log(response.data);
    };
    fetchOrder();
  }, []);

  return order
    ? (
      <>
        <Header />
        <h1>Detalhe do Pedido</h1>
        <div>
          <p data-testid="customer_order_details__element-order-details-label-order-id">
            { `Pedido: ${order.orderId}` }
          </p>
          <p data-testid="customer_order_details__element-order-details-label-seller-name">Vend: { order.sellerName }</p>
          <p data-testid="customer_order_details__element-order-details-label-order-date">{ new Date(order.date).toLocaleDateString() }</p>
          <p data-testid="customer_order_details__element-order-details-label-delivery-status">{ order.status }</p>
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
            { order.products.map((item, index) => (
            <tr
              key={ item.id }
              data-testid={ `customer_order_details__element-order-table-item-number-${index}` }
            >
              <td>
                { index + 1 }
              </td>
              <td
                data-testid={ `customer_order_details__element-order-table-name-${index}` }
              >
                { item.name }

              </td>
              <td
                data-testid={ `customer_order_details__element-order-table-quantity-${index}` }
              >
                { item.quantity }
              </td>
              <td
                data-testid={ `customer_order_details__element-order-table-unit-price-${index}` }
              >
                { item.price.replace('.', ',') }
              </td>
              <td
                data-testid={ `customer_order_details__element-order-table-sub-total-${index}` }
              >
                {
                  (Number(item.price) * item.quantity).toFixed(2).replace('.', ',')
                }
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      <p
        data-testid="customer_order_details__element-order-total-price"
      >
        { `Total: ${order.totalPrice.replace('.', ',') }`}
      </p>
    </>)
    : (<h1>Carregando...</h1>);
}
