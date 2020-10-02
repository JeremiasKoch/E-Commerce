import { 
    GET_CART
} from '../actions/actionsCart';

const initialStateCart = {
    cart: []
};
    
function rootReducerCart (state = initialStateCart, action) {
    if (action.type === GET_CART) {
        return {
            ...state,
            cart: action.payload
        }
    }
    return state;
}

export default rootReducerCart;