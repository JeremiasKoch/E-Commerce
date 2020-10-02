import { axiosGet, axiosPost, axiosPut, axiosDelete } from "../../Axios";
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const CREATE_CATEGORIES = 'CREATE_CATEGORIES'
export const DELETE_CATEGORIES = 'DELETE_CATEGORIES';
export const EDIT_ROW = 'EDIT_ROW';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const CANCEL_UPDATE_CATEGORY = 'CANCEL_UPDATE_CATEGORY';

export function getCategories() {
	return function(dispatch) {
    return axiosGet('category')
    .then(json => {
      dispatch({ type: GET_CATEGORIES, payload: json.data });
    });
  }
}

export function addCategories(data) {
  return function(dispatch) {
    return axiosPost('category', null, data)
    .then(json => {
      dispatch({ type: CREATE_CATEGORIES, payload: json.data });
    });
  }
}

export function deleteCategories(id) {
	return function(dispatch) {
    return axiosDelete('category', id)
    .then(json => {
      dispatch({ type: DELETE_CATEGORIES, payload: json.data });
    });
  }
}

export function editRow(id, data) {
  return function(dispatch) {
    return axiosGet('category', id, data)
    .then(json => {
      dispatch({ type: EDIT_ROW, payload: json.data });
    });
  }
}

export function updateCategories(id, data) {
  return function(dispatch) {
    return axiosPut('category', id, data)
    .then(json => {
      dispatch({ type: UPDATE_CATEGORIES, payload: json.data });
    });
  }
}

export function cancelUpdateCategory(booleano) {
  return { type: CANCEL_UPDATE_CATEGORY, payload: booleano }
}