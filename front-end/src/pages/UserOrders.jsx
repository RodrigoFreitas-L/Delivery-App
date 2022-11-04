import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';
import user from '../helpers/user';

export default function UserOrders() {
  // const history = useHistory();
  const [{ customerOrders }, setState] = useState({
    customerOrders: [],
  });

  useEffect(() => {
    // if (!user()) {
    //   history.push('/login');
    // }
    api.get(`customer/orders?userId=${user().id}`).then((response) => {
      setState((state) => ({
        ...state,
        customerOrders: [...response.data.orders],
      }));
    });
  }, []);

  return (
    <>
      <Header />
      {customerOrders.map(({ id, status, saleDate, totalPrice }) => (
        <Link to={ `/orders/${id}` } key={ id }>
          <div className="card">
            <div
              data-testid={ `customer_orders__element-order-id-${id}` }
            >
              {id}
            </div>
            <div
              data-testid={ `customer_orders__element-delivery-status-${id}` }
            >
              {status}
            </div>
            <div className="card-date-price">
              <div
                data-testid={ `customer_orders__element-order-date-${id}` }
              >
                {new Date(saleDate).toLocaleDateString()}
              </div>
              <div
                data-testid={ `customer_orders__element-card-price-${id}` }
              >
                {totalPrice}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
