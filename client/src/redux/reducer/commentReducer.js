import { 
    GET_COMMENTS_BY_REVIEW, GET_ONE_COMMENT, GET_COMMENTS_BY_USER, CREATE_COMMENT,
    UPDATE_COMMENT, DELETE_COMMENT
} from '../actions/actionsComments';

const initialStateCategories = {
    currentReviewComments: [],
    currentComment: {},
    currentUserComments: []
};

function rootReducerComment (state = initialStateCategories, action) {
    if (action.type === GET_COMMENTS_BY_REVIEW) {
        return {
            ...state,
            currentReviewComments: action.payload
        }
    }

    if (action.type === GET_ONE_COMMENT) {
        return {
            ...state,
            currentComment: action.payload
        }
    }

    if (action.type === GET_COMMENTS_BY_USER) {
        return {
            ...state,
            currentUserComments: action.payload
        }
    }

    if (action.type === CREATE_COMMENT) {
        return {
            ...state,
            currentReviewComments: state.comments.concat(action.payload)
        }
    }

    if (action.type === UPDATE_COMMENT) {
        return {
            ...state,
            currentReviewComments: state.comments.map(comment => comment.id === action.payload.id ? action.payload : comment),
            currentComment: {}
        };
    }

    if (action.type === DELETE_COMMENT) {
        return {
            ...state,
            currentReviewComments: state.comments.filter(comment => comment.id !== action.payload.id)
        };
    }
    return state;
}

export default rootReducerComment;