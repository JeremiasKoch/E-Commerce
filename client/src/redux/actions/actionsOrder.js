import { axiosGet, axiosPost, axiosPut, axiosDeleteWithData } from "../../Axios";
export const GET_ORDERS = 'GET_PRODUCTS';
export const GET_ONE_ORDER = 'GET_ONE_ORDER';
export const GET_ORDER_BY_USER = 'GET_ORDER_BY_USER';
export const CREATE_ORDER = 'CREATE_ORDER';
export const SHOW_ORDERS = 'SHOW_ORDERS';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_PRODUCT_FROM_ORDER = 'DELETE_PRODUCT_FROM_ORDER';
export const CANCEL_ORDER = 'CANCEL_ORDER';

export function getOrders(id) {
  if(id){
    return function(dispatch) {
      return axiosGet('orders', id)
      .then(json => {
        dispatch({ type: GET_ONE_ORDER, payload: json.data });
      });
    }
  }
	return function(dispatch) {
    return axiosGet('orders')
    .then(json => {
      console.log(json.data)
      dispatch({ type: GET_ORDERS, payload: json.data });
    });
  }
}

export function getOrderByUser() {
    return function(dispatch) {
      return axiosGet('orders/users')
      .then(json => {
        dispatch({ type: GET_ORDER_BY_USER, payload: json.data });
      });
    }
}

export function addOrder(data) {
  return function(dispatch) {
    return axiosPost('orders', null, data)
    .then(json => {
      dispatch({ type: CREATE_ORDER, payload: json.data });
    });
  }
}

export function showOrder() {
	return { 
    type: SHOW_ORDERS
  };
}

export function updateOrder(id, data) {
  return function(dispatch) {
    return axiosPut('orders', id, data)
    .then(json => {
      dispatch({ type: UPDATE_ORDER, payload: json.data });
    });
  }
}

export function deleteProductFromOrder(data) {
	return function(dispatch) {
    return axiosDeleteWithData(`users/cart`, null, data, 'id')
    .then(json => {
      console.log('DENTRO DEL THEN')
      dispatch({ type: DELETE_PRODUCT_FROM_ORDER, payload: json.data });
    })
    .then(() => {
      window.location.reload(false)
    })
    .catch(err => console.log('Estoy arrojando un error', err));
  }
}

export function cancelOrder(id) {
	return function(dispatch) {
    return axiosPut(`orders/empty/${id}`)
    .then(json => {
      console.log('JSON', json.data)
      dispatch({ type: CANCEL_ORDER, payload: json.data });
    })
    .then(() => {
      window.location.reload(false);
    })
  }
}