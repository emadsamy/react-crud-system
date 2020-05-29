import * as actionTypes from './actionTypes';
import axios from 'axios';

export const postsStart = () => {
    return {
        type: actionTypes.START_POSTS
    }
}

export const postsSuccess = (posts) => {
    return {
        type: actionTypes.SUCCESS_POSTS,
        posts: posts
    }
}

export const postsFail = (error) => {
    return {
        type: actionTypes.FAIL_POSTS,
        postsError: error
    }
}

export const postsGet = () => {
    return dispatch => {
        dispatch(postsStart());
        axios.get("http://laravelblog77.herokuapp.com/api/v1/posts")
            .then((response) => {
                const data = response.data.data;
                // console.log(data);
                dispatch(postsSuccess(data));
            })
            .catch((error) => {
                console.log(error);
                dispatch(postsFail(error));
            });
    }
}