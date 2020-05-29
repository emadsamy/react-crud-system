import * as actionTypes from './actionTypes';

const initsalState = {
    loading: false,
    error: null,
    registerSuccess: false,
    loginSuccess: false,
    authType: "",
    posts: [],
    postsLoading: false,
    postsError: ""
}

const applySetUserType = (state, action) => ({
    ...state,
    authType: action.payload
});

const reducer = (state = initsalState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_TYPE:
            return applySetUserType(state, action);
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS_LOGIN:
            return {
                ...state,
                loading: false,
                loginSuccess: true,
                error: null
            };
        case actionTypes.AUTH_SUCCESS_REGISTER:
            return {
                ...state,
                loading: false,
                registerSuccess: true,
                error: null
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                registerSuccess: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state
            };
        case actionTypes.START_POSTS:
            return {
                ...state,
                postsLoading: true
            };
        case actionTypes.SUCCESS_POSTS:
            return {
                ...state,
                postsLoading: false,
                posts: action.posts
            };
        case actionTypes.FAIL_POSTS:
            return {
                ...state,
                postsLoading: false,
                postsError: action.error
            };
        default:
            return state;
    }
}

export default reducer;