import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurguerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGUER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurguerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGUER_FAILURE,
    error: error
  };
};

export const purchaseBurguerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGUER_START
  };
};


export const purchaseBurguer = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurguerStart());

    axios.post( '/orders.json', orderData )
      .then( response => {
        dispatch(purchaseBurguerSuccess(response.data.name, orderData));
      } )
      .catch( error => {
        dispatch(purchaseBurguerFailure(error));
      } );
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersStart = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFailure = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error: error
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());

    axios.get('/orders.json')
     .then(response => {
       const fetchedOrders = [];
       for (let key in response.data) {
         fetchedOrders.push({
           id: key,
           ...response.data[key]
         });
       }
       dispatch(fetchOrdersSuccess(fetchedOrders));
     })
     .catch(error => {
       dispatch(fetchOrdersFailure(error))
     });
  };
};
