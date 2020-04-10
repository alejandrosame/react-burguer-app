import React from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions';

class Orders extends React.Component {

  componentDidMount(){
    this.props.onFetchOrders();
  }

  render() {
    let orders = this.props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));

    if (this.props.loading) {
      orders = <Spinner />;
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
);
