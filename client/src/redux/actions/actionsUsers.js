import { axiosGet, axiosGetWithData, axiosPost, axiosPut, axiosDelete } from "../../Axios";
export const GET_USER = 'GET_USER';
export const GET_ONE_USER = 'GET_ONE_USER';
export const SEARCH_ONE_USER = 'SEARCH_ONE_USER';
export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER'; //TAMBIEN SE USA EN /PROMOTE
export const UPDATE_PASSWORD_USER = 'UPDATE_PASSWORD_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const ME_USER = 'ME_USER';

export function getUsers() {
  return function(dispatch) {
    return axiosGet('users')
    .then(json => {
      dispatch({ type: GET_USER, payload: json.data });
    });
  }
}


export function getOneUser (id){
  return function(dispatch) {
    return axiosGet('users', id)
    .then(json => {
      dispatch({ type: GET_ONE_USER, payload: json.data });
    });
  }
}

//REVISAR CUANDO COMPONENTE DE FRONT ESTE LISTO
export function searchOneUser (data){
  if (data.includes('@')) {
    return function(dispatch) {
      return axiosGetWithData('users/search', null, data, 'email')
      .then(json => {
        dispatch({ type: SEARCH_ONE_USER, payload: json.data });
      });
    }
  } else {
    return function(dispatch) {
      return axiosGetWithData('users/search', null, data, 'id')
      .then(json => {
        dispatch({ type: SEARCH_ONE_USER, payload: json.data });
      });
    }
  }
}



export function createUser(data) {
  return function(dispatch) {
    return axiosPost('auth/register', null, data)
    .then(json => {
      console.log(json.data)
      dispatch({ type: CREATE_USER, payload: json.data });
    });
  }
}

export function deleteUser(id) {
	return function(dispatch) {
    return axiosDelete('users', id)
    .then(json => {
      dispatch({ type: DELETE_USER, payload: json.data });
    });
  }
}

export function updateUser(id, data) {
  return function(dispatch) {
    return axiosPut('users', id, data)
    .then(json => {
      dispatch({ type: UPDATE_USER, payload: json.data });
    });
  }
}

export function updatePasswordUser(data, history) {
  return function(dispatch) {
    return axiosPut('users/reset', null, data)
    .then(json => {
      dispatch({ type: UPDATE_PASSWORD_USER, payload: json.data });
    })
    .then(() => {
      history.push('/login');
    })
  }
}

export function loginUser(data, history) {
  return function(dispatch) {
    return axiosPost('auth/login', null, data)
    .then(respuesta => {
      if(respuesta){
        sessionStorage.setItem('user', JSON.stringify(respuesta.data));
        let localData = [];
        if(localStorage.length){
          for (const ls in localStorage) {
            if(ls.includes('prodId')){
              localData.push(JSON.parse(localStorage.getItem(ls)));
            }
          }
        }
        history.push('/home');
        if(localData.length >  0){
          return axiosPost('orders', null, localData)
          .then(ordenSinLoguear => {
            localStorage.clear();
            dispatch({type: 'Hola', payload: ordenSinLoguear});
          })
        }
      }
      else{
        console.log("El usuario no existe.")
      }
    })
    .catch( err => {
    alert("C A P O E I R A no podés entrar. Registrate")
    })
  }
}

export function logoutUser() {
  return function(dispatch) {
    return axiosGet('auth/logout')
    .then(respuesta => {
      window.location.reload(false);
    })
    .catch(err => console.log(err));
  }
}

export function meUser (id){
  return function(dispatch) {
    return axiosGet('users', id)
    .then(json => {
      dispatch({ type: GET_ONE_USER, payload: json.data });
    });
  }
}