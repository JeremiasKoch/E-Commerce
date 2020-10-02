import { axiosGet, axiosPost, axiosPut, axiosDelete } from "../../Axios";
export const GET_REVIEWS = 'GET_REVIEWS';
export const GET_ONE_REVIEW = 'GET_ONE_REVIEW';
export const GET_REVIEWS_BY_USER = 'GET_REVIEWS_BY_USER';
export const CREATE_REVIEW = 'CREATE_REVIEW';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';

export function getReviews(productId) {
  return function(dispatch) {
    return axiosGet(`product/${productId}/review`)
    .then(json => {
      dispatch({ type: GET_REVIEWS, payload: json.data });
    });
  }
}

export function getOneReview(reviewId) {
  return function(dispatch) {
    return axiosGet('product/reviews', reviewId)
    .then(json => {
      dispatch({ type: GET_ONE_REVIEW, payload: json.data });
    });
  }
}

export function getReviewsByUser(userId) {
  return function(dispatch) {
    return axiosGet(`users/reviews`)
    .then(json => {
      dispatch({ type: GET_REVIEWS_BY_USER, payload: json.data });
    });
  }
}

export function createReview(productId, data) {
  return function(dispatch) {
    return axiosPost(`product/${productId}/review`, null, data)
    .then(json => {
      dispatch({ type: CREATE_REVIEW, payload: json.data });
    });
  }
}

export function updateReview(reviewId, data) {
  return function(dispatch) {
    return axiosPut('product/reviews', reviewId, data)
    .then(json => {
      dispatch({ type: UPDATE_REVIEW, payload: json.data });
    });
  }
}

export function deleteReview(reviewId) {
  return function(dispatch) {
    return axiosDelete('product/reviews', reviewId)
    .then(json => {
      dispatch({ type: DELETE_REVIEW, payload: json.data });
    });
  }
}