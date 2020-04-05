import React from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount(){
    axios.get('/orders.json')
      .then(response => {
        console.log(response.data);
        const fetchOrders = [];
        for (let key in response.data) {
          fetchOrders.push({
            id: key,
            ...response.data[key]
          });
        }
        this.setState({loading: false, orders: fetchOrders});
      })
      .catch(error => {
        this.setState({loading: false});
      })
  }

  render() {
    let orders = this.state.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));

    if (this.state.loading) {
      orders = <Spinner />;
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
