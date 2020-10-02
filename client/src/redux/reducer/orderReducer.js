import { 
    GET_ORDERS, GET_ONE_ORDER, GET_ORDER_BY_USER, 
    CREATE_ORDER, DELETE_PRODUCT_FROM_ORDER, UPDATE_ORDER
} from '../actions/actionsOrder';

const initialStateOrders = {
    orders: [],
    currentOrder: {},
    ordersByUser: [],
    showAllOrders: true
};
    
function rootReducerOrder (state = initialStateOrders, action) {
    if (action.type === GET_ORDERS) {
        return {
            ...state,
            orders: action.payload,
            showAllOrders: true
        }
    }

    if (action.type === GET_ONE_ORDER) {
        return {
            ...state,
            currentOrder: action.payload,
            showAllOrders: false
        }
    }

    if (action.type === GET_ORDER_BY_USER) {
        return {
            ...state,
            ordersByUser: action.payload,
            showAllOrders: false
        }
    }
    
    if (action.type === CREATE_ORDER) {
        return {
            ...state,
            orders: state.orders.concat(action.payload)
        }
    }

    if (action.type === UPDATE_ORDER) {
        return {
            ...state,
            orders: state.orders.map(orden => orden.id === action.payload.id ? action.payload : orden)
        };
    }

    if (action.type === DELETE_PRODUCT_FROM_ORDER) {
        return {
            ...state,
            orders: state.orders.filter(orden => orden.id !== action.payload.id)
        };
    }
    return state;
}

export default rootReducerOrder;