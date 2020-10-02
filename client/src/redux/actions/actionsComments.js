import { axiosGet, axiosPost, axiosPut, axiosDelete } from "../../Axios";
export const GET_COMMENTS_BY_REVIEW = 'GET_COMMENTS';
export const GET_ONE_COMMENT = 'GET_ONE_COMMENT';
export const GET_COMMENTS_BY_USER = 'GET_COMMENTS_BY_USER';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


export function getCommentsByReview(reviewId) {
  return function(dispatch) {
    return axiosGet('products/review/comments/', reviewId)
    .then(json => {
      dispatch({ type: GET_COMMENTS_BY_REVIEW, payload: json.data });
    });
  }
}

export function getOneComment(commentId) {
  return function(dispatch) {
    return axiosGet('products/reviews/comments/single/', commentId)
    .then(json => {
      dispatch({ type: GET_ONE_COMMENT, payload: json.data });
    });
  }
}

export function getCommentsByUser() {
  return function(dispatch) {
    return axiosGet(`users/comments`)
    .then(json => {
      dispatch({ type: GET_COMMENTS_BY_USER, payload: json.data });
    });
  }
}

export function createComment(reviewId, data) {
  return function(dispatch) {
    return axiosPost('products/review/comments/', reviewId, data)
    .then(json => {
      dispatch({ type: CREATE_COMMENT, payload: json.data });
    });
  }
}

export function updateComment(commentId, data) {
  return function(dispatch) {
    return axiosPut('products/reviews/comments/single/', commentId, data)
    .then(json => {
      dispatch({ type: UPDATE_COMMENT, payload: json.data });
    });
  }
}

export function deleteComment(commentId) {
  return function(dispatch) {
    return axiosDelete('products/reviews/comments/single/', commentId)
    .then(json => {
      dispatch({ type: DELETE_COMMENT, payload: json.data });
    });
  }
}