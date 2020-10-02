import { axiosGet, axiosPost, axiosPut, axiosDelete } from "../../Axios";
export const GET_ADDRESSES_BY_USER = 'GET_ADDRESSES_BY_USER';
export const GET_ONE_ADDRESS = 'GET_ONE_ADDRESS';
export const CREATE_ADDRESS = 'CREATE_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';


export function getAddressesByUser() {
  return function(dispatch) {
    return axiosGet(`users/address`)
    .then(json => {
      dispatch({ type: GET_ADDRESSES_BY_USER, payload: json.data });
    });
  }
}

export function getOneAddress(addressId) {
  return function(dispatch) {
    return axiosGet('users/addresses', addressId)
    .then(json => {
      dispatch({ type: GET_ONE_ADDRESS, payload: json.data });
    });
  }
}

export function createAddress(data) {
  return function(dispatch) {
    return axiosPost(`users/address`, null, data)
    .then(json => {
      dispatch({ type: CREATE_ADDRESS, payload: json.data });
    });
  }
}

export function updateAddress(addressId, data) {
  return function(dispatch) {
    return axiosPut('users/addresses', addressId, data)
    .then(json => {
      dispatch({ type: UPDATE_ADDRESS, payload: json.data });
    });
  }
}

export function deleteAddress(addressId) {
  return function(dispatch) {
    return axiosDelete('users/addresses', addressId)
    .then(json => {
      dispatch({ type: DELETE_ADDRESS, payload: json.data });
    });
  }
}