import { combineReducers } from 'redux';
import rootReducerCategories from './categoryReducer';
import rootReducerProduct from './productReducer';
import rootReducerUsers from './userReducer';
import rootReducerOrder from './orderReducer';
import rootReducerCart from './cartReducer';
import rootReducerReview from './reviewReducer';
import rootReducerComment from './commentReducer';
import rootReducerAddress from './addressReducer';

const rootReducer = combineReducers({
    categoriesReducer: rootReducerCategories,
    productReducer: rootReducerProduct,
    userReducer: rootReducerUsers,
    orderReducer: rootReducerOrder,
    cartReducer: rootReducerCart,
    reviewReducer: rootReducerReview,
    commentReducer: rootReducerComment,
    addressReducer: rootReducerAddress
});

export default rootReducer;