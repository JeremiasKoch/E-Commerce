import { 
    GET_CATEGORIES, CREATE_CATEGORIES, DELETE_CATEGORIES, 
    EDIT_ROW, UPDATE_CATEGORIES, CANCEL_UPDATE_CATEGORY
} from '../actions/actionsCategories';

const initialStateCategories = {
    categories: [],
    currentCategory: {},
    editing: false
};
    
function rootReducerCategories (state = initialStateCategories, action) {
    if (action.type === GET_CATEGORIES) {
        return {
            ...state,
            categories: action.payload
        }
    }

    if (action.type === CREATE_CATEGORIES) {
        return {
            ...state,
            categories: state.categories.concat(action.payload)
        }
    }

    if (action.type === DELETE_CATEGORIES) {
        return {
            ...state,
            categories: state.categories.filter(category => category.id !== action.payload.id)
        };
    }
    if (action.type === EDIT_ROW) {
        return {
            ...state,
            editing: true,
            currentCategory: action.payload
        }
    }  
    if (action.type === UPDATE_CATEGORIES) {
        return {
            ...state,
            editing: false,
            categories: state.categories.map(category => category.id === action.payload.id ? action.payload : category),
            currentCategory: {}
        };
    }
    if (action.type === CANCEL_UPDATE_CATEGORY) {
        return {
            ...state,
            editing: action.payload,
            currentCategory: {}
        }
    }
    return state;
}

export default rootReducerCategories;