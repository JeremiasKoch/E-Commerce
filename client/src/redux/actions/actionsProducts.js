import { axiosGet, axiosPost, axiosPut, axiosDelete } from "../../Axios";
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_REAL_TIME = 'GET_REAL_TIME';
export const CREATE_PRODUCTS = 'CREATE_PRODUCTS'
export const GET_BY_CAT_MENU = 'GET_BY_CAT_MENU'
export const GET_CATS_BY_PROD = 'GET_CATS_BY_PROD'
export const EDIT_ROW = 'EDIT_ROW';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CANCEL_UPDATE_PRODUCT = 'CANCEL_UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function getProducts(id) {
  if(id){
    return function(dispatch) {
      return axiosGet('product', id)
      .then(json => {
        dispatch({ type: GET_PRODUCTS, payload: json.data });
      });
    }
  }
	return function(dispatch) {
    return axiosGet('product')
    .then(json => {
      dispatch({ type: GET_PRODUCTS, payload: json.data });
    });
  }
}

export function addProducts(data) {
  return function(dispatch) {
    return axiosPost('product', null, data)
    .then(json => {
      dispatch({ type: CREATE_PRODUCTS, payload: json.data });
    });
  }
}

export function getByCatMenu(value) {
	if (!value) return getProducts()
	return function(dispatch) {
    return axiosGet('product/category', value)
    .then(json => {
      dispatch({ type: GET_BY_CAT_MENU, payload: json.data });
    });
  }
}

export function getCatsByProd(value) {
  // if (!value) return getProducts()
  return function(dispatch) {
    return axiosGet('product/categories', value)
    .then(json => {
      dispatch({ type: GET_CATS_BY_PROD, payload: json.data });
    });
  }
}

export function getRealTime(value) {
  const nameCapitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  if (!nameCapitalized) return getProducts()
  return function(dispatch) {
    return axiosGet('product/buscador', nameCapitalized)
    .then(json => {
      dispatch({ type: GET_REAL_TIME, payload: json.data });
    });
  }
}

export function editRow(id, data) {
  return function(dispatch) {
    return axiosGet('product', id, data)
    .then(json => {
      dispatch({ type: EDIT_ROW, payload: json.data });
    });
  }
}

export function updateProduct(id, data) {
  return function(dispatch) {
    return axiosPut('product', id, data)
    .then(json => {
      dispatch({ type: UPDATE_PRODUCT, payload: json.data });
    });
  }
}

export function cancelUpdateProduct(booleano) {
  return { type: CANCEL_UPDATE_PRODUCT, payload: booleano }
}

export function deleteProduct(id) {
	return function(dispatch) {
    return axiosDelete('product', id)
    .then(json => {
      dispatch({ type: DELETE_PRODUCT, payload: json.data });
    });
  }
}