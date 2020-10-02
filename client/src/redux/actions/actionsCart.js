import { axiosGet, axiosPost, axiosPut, axiosDelete } from "../../Axios";
export const GET_CART = 'GET_CART';
export const CREATE_CART = 'CREATE_CART';
export const UPDATE_CART_PRODUCT_QUANTITY = 'UPDATE_CART_PRODUCT_QUANTITY';
export const UPDATE_PRODUCT_STOCK = 'UPDATE_PRODUCT_STOCK';

// OBTENER, AGREGAR, EDITAR, ELIMINAR ITEM, VACIAR CARRITO
export function getCart(){
    return function(dispatch) {
        return axiosGet(`users/cart`)
        .then(json => {
            dispatch({ type: GET_CART, payload: json.data });
        });
    }
}

export function postCreateCart(product){
    return function(dispatch) {
        return axiosPost(`users/cart`, null, product)
        .then(() => {
            dispatch({ type: CREATE_CART, payload: product });
        })
        .catch(err => console.log(err))
    };
};

export function updateCartProductQuantity(product){
    return function(dispatch) {
        return axiosPut(`users/cart`, null, product)
        .then(json => {
            dispatch({ type: UPDATE_CART_PRODUCT_QUANTITY, payload: json.data });
        })
        .catch(err => console.log(err))
    };
};

export function updateProductStock(products){
    console.log(products)
    return function(dispatch) {
        for (const product of products) {
            return axiosPut(`users/cart/complete`, null, product)
            .then(json => {
                console.log('STOCK UPDATEADO', json.data)
                dispatch({ type: UPDATE_PRODUCT_STOCK, payload: json.data });
            })
            .catch(err => console.log(err))
        }
    };
};
