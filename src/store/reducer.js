import * as actionTypes from './actionTypes';

const initsalState = {
    loading: false,
    error: null,
    registerSuccess: false,
    loginSuccess: false,
    authType: ""
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
        default:
            return state;
    }
}

export default reducer;