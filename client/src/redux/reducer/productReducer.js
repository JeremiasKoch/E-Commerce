import { 
    GET_PRODUCTS, CREATE_PRODUCTS, GET_BY_CAT_MENU, GET_CATS_BY_PROD, 
    GET_REAL_TIME, EDIT_ROW, UPDATE_PRODUCT, CANCEL_UPDATE_PRODUCT, DELETE_PRODUCT
} from '../actions/actionsProducts';

const initialStateCategories = {
    products: [],
    productsRealTime: [],
    showAllProducts: true,
    currentProduct: {},
    currentProductCategories: [],
    editing: false
};
    
function rootReducerProduct (state = initialStateCategories, action) {
    if (action.type === GET_PRODUCTS) {
        return {
            ...state,
            products: action.payload,
            showAllProducts: true
        }
    }

    if (action.type === CREATE_PRODUCTS) {
        return {
            ...state,
            products: state.products.concat(action.payload),
            showAllProducts: true
        }
    }

    if (action.type === GET_BY_CAT_MENU) {
        return {
            ...state,
            productsRealTime: action.payload,
            showAllProducts: false
        }
    }

    if (action.type === GET_CATS_BY_PROD) {
        return {
            ...state,
            currentProductCategories: action.payload
        }
    }

    if (action.type === GET_REAL_TIME) {
        return {
            ...state,
            productsRealTime: action.payload,
            showAllProducts: false
        }
    }
    if (action.type === EDIT_ROW) {
        return {
            ...state,
            editing: true,
            currentProduct: action.payload
        }
    }
    if (action.type === UPDATE_PRODUCT) {
        return {
            ...state,
            editing: false,
            products: state.products.map(product => product.id === action.payload.id ? action.payload : product),
            currentProduct: {},
            currentProductCategories: []
        };
    }
    if (action.type === CANCEL_UPDATE_PRODUCT) {
        return {
            ...state,
            editing: action.payload,
            currentProduct: {},
            currentProductCategories: []
        }
    }
    if (action.type === DELETE_PRODUCT) {
        return {
            ...state,
            products: state.products.filter(product => product.id !== action.payload.id)
        };
    }
    return state;
}

export default rootReducerProduct;