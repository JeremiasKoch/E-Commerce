import { 
    GET_ADDRESSES_BY_USER, GET_ONE_ADDRESS, CREATE_ADDRESS,
    UPDATE_ADDRESS, DELETE_ADDRESS
} from '../actions/actionsAddresses';

const initialStateCategories = {
    userAddresses: [],
    currentAddress: {}
};

function rootReducerAddress (state = initialStateCategories, action) {
    if (action.type === GET_ADDRESSES_BY_USER) {
        return {
            ...state,
            userAddresses: action.payload
        }
    }

    if (action.type === GET_ONE_ADDRESS) {
        return {
            ...state,
            currentAddress: action.payload
        }
    }

    if (action.type === CREATE_ADDRESS) {
        return {
            ...state,
            userAddresses: state.userAddresses.concat(action.payload)
        }
    }

    if (action.type === UPDATE_ADDRESS) {
        return {
            ...state,
            userAddresses: state.userAddresses.map(address => address.id === action.payload.id ? action.payload : address),
            currentAddress: {}
        };
    }

    if (action.type === DELETE_ADDRESS) {
        return {
            ...state,
            userAddresses: state.userAddresses.filter(address => address.id !== action.payload.id)
        };
    }
    return state;
}

export default rootReducerAddress;