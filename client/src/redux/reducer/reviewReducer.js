import { 
    GET_REVIEWS, GET_ONE_REVIEW, GET_REVIEWS_BY_USER, CREATE_REVIEW,
    UPDATE_REVIEW, DELETE_REVIEW
} from '../actions/actionsReviews';

const initialStateCategories = {
    reviews: [],
    currentReview: {},
    currentUserReviews: []
};

function rootReducerReview (state = initialStateCategories, action) {
    if (action.type === GET_REVIEWS) {
        return {
            ...state,
            reviews: action.payload
        }
    }

    if (action.type === GET_ONE_REVIEW) {
        return {
            ...state,
            currentReview: action.payload
        }
    }

    if (action.type === GET_REVIEWS_BY_USER) {
        return {
            ...state,
            currentUserReviews: action.payload
        }
    }

    if (action.type === CREATE_REVIEW) {
        return {
            ...state,
            reviews: state.reviews.concat(action.payload)
        }
    }

    if (action.type === UPDATE_REVIEW) {
        return {
            ...state,
            reviews: state.reviews.map(review => review.id === action.payload.id ? action.payload : review),
            currentReview: {}
        };
    }

    if (action.type === DELETE_REVIEW) {
        return {
            ...state,
            reviews: state.reviews.filter(review => review.id !== action.payload.id)
        };
    }
    return state;
}

export default rootReducerReview;