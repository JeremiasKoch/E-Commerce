import axios from 'axios';
axios.defaults.withCredentials = true;
const API_BASE_URL = 'http://localhost:3001/';

export function axiosGet (ruta, param = null){
    return !param ? axios.get(`${API_BASE_URL}${ruta}`, {withCredentials: true}) : axios.get(`${API_BASE_URL}${ruta}/${param}`, {withCredentials: true});
}

export function axiosGetWithData (ruta, param = null, data = null, property = null){
    return axios.get(`${API_BASE_URL}${ruta}`, {data: {[property]: data[property]}}, {withCredentials: true})
}

export function axiosPost (ruta, param = null, data = null){
    return !param ? axios.post(`${API_BASE_URL}${ruta}`, data, {withCredentials: true}) : axios.post(`${API_BASE_URL}${ruta}/${param}`, data, {withCredentials: true});
}

export function axiosPut (ruta, param = null, data = null){
    return !param ? axios.put(`${API_BASE_URL}${ruta}`, data, {withCredentials: true}) : axios.put(`${API_BASE_URL}${ruta}/${param}`, data, {withCredentials: true});
}

export function axiosDelete (ruta, param  = null){
    // Property es el nombre de la propiedad a la que quiero acceder para borrar algún dato de la db
    return !param ? axios.delete(`${API_BASE_URL}${ruta}`, {withCredentials: true}) : axios.delete(`${API_BASE_URL}${ruta}/${param}`, {withCredentials: true});
}

export function axiosDeleteWithData (ruta, param  = null, data = null, property = null){
    // debugger;
    // Property es el nombre de la propiedad a la que quiero acceder para borrar algún dato de la db
    return !param ? axios.delete(`${API_BASE_URL}${ruta}`, {data: {[property]: data[property]}}) : axios.delete(`${API_BASE_URL}${ruta}/${param}`, {data: {[property]: data[property]}});
}
