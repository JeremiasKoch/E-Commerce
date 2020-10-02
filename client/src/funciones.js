import { axiosGet } from './Axios';

export function get (){
    return axiosGet(`product`) ;
}