import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccessRegister = () => {
    return {
        type: actionTypes.AUTH_SUCCESS_REGISTER
    }
}

export const authSuccessLogin = () => {
    return {
        type: actionTypes.AUTH_SUCCESS_LOGIN
    }
}

export const authType = (userData) => {
    return {
        type: actionTypes.AUTH_TYPE,
        payload: userData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const registerAuth = (name, email, password, c_password, avatar, birthdate) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            name: name,
            email: email,
            password: password,
            c_password: c_password,
            avatar: avatar,
            birthdate: birthdate
        }
        axios.post('http://laravelblog77.herokuapp.com/api/v1/register', data)
            .then((response) => {
                console.log(response.data);
                dispatch(authSuccessRegister());
            })
            .catch(error => {
                dispatch(authFail(error));
                console.log(error);
            });
    }
}

export const loginAuth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password
        }
        axios.post('http://laravelblog77.herokuapp.com/api/v1/login', data)
            .then((response) => {
                localStorage.setItem('token', response.data.success.token);
                dispatch(authType(response.data.data));
                dispatch(authSuccessLogin());
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    }
}