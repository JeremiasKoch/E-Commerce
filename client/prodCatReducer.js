import { 
    GET_CATSBYPROD
    // , CREATE_PRODCAT, EDIT_ROW,
    // UPDATE_PRODCAT, CANCEL_UPDATE_PRODCAT, DELETE_PRODCAT
} from '../actions/actionsProdCat';

const initialStateProdCat = {
    prodCat: {},
    // productsRealTime: [],
    // showAllProducts: true,
    currentProdCat: [],
    // editing: false
};
    
function rootReducerProdCats (state = initialStateProdCat, action) {
    switch (action.type) {
        case GET_CATSBYPROD:
            return {
                ...state,
                currentProdCat: action.payload
            }
        default: return state
    }
}
//     if (action.type === CREATE_PRODUCTS) {
//         return {
//             ...state,
//             products: state.products.concat(action.payload),
//             showAllProducts: true
//         }
//     }

//     if (action.type === GET_REAL_TIME) {
//         return {
//             ...state,
//             productsRealTime: action.payload,
//             showAllProducts: false
//         }
//     }
//      if (action.type === EDIT_ROW) {
//         return {
//             ...state,
//             editing: true,
//             currentProduct: action.payload
//         }
//     }
//     if (action.type === UPDATE_PRODUCT) {
//         return {
//             ...state,
//             editing: false,
//             products: state.products.map(product => product.id === action.payload.id ? action.payload : product),
//             currentProduct: {}
//         };
//     }
//     if (action.type === CANCEL_UPDATE_PRODUCT) {
//         return {
//             ...state,
//             editing: action.payload,
//             currentProduct: {}
//         }
//     }
//     if (action.type === DELETE_PRODUCT) {
//         return {
//             ...state,
//             products: state.products.filter(product => product.id !== action.payload.id)
//         };
//     }
//     return state;
// }

export default rootReducerProdCats;