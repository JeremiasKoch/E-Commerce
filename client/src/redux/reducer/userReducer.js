import { 
    GET_USER, GET_ONE_USER, SEARCH_ONE_USER,
    CREATE_USER, DELETE_USER, UPDATE_USER,
    UPDATE_PASSWORD_USER, LOGIN_USER
} from '../actions/actionsUsers';

const initialStateUser = {
    users: [],
    currentUser: {},
    userLogin: {},
    resetPass: false
};
    
function rootReducerUsers (state = initialStateUser, action) {
    if (action.type === GET_USER) {
        return {
            ...state,
            users: action.payload
        }
    }
    if (action.type === GET_ONE_USER) {
        return {
            ...state,
            currentUser: action.payload
        }
    }
    if (action.type === SEARCH_ONE_USER) {
        return {
            ...state,
            currentUser: state.users.filter(user => (user.id === action.payload.id || user.email === action.payload.email))
        }
    }
    if (action.type === CREATE_USER) {
        return {
            ...state,
            users: state.users.concat(action.payload)
        }
    }

    if (action.type === DELETE_USER) {
        return {
            ...state,
            users: state.users.filter(user => user.id !== action.payload.id)
        };
    }
     
    if (action.type === UPDATE_USER) {
        return {
            ...state,
            users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
        };
    }

    if (action.type === UPDATE_PASSWORD_USER) {
        return {
            ...state,
            resetPass: true
        };
    }

    if (action.type === LOGIN_USER) {
        return {
            ...state,
            userLogin: action.payload
        };
    }
    
    return state;
}

export default rootReducerUsers;