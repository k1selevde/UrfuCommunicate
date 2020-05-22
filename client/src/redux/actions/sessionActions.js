import {
    AUTH_FAILURE,
    AUTH_SUCCESS,
    HIDE_ALERT,
    LOG_OUT,
    SESSION_REQUEST,
    SET_ERROR
} from "./actionTypes";
import { API_ROOT } from "../../constants/Default";
import { checkResponse, httpPost } from "../../helpers/network";



export function registerMe(data) {

    return (dispatch) => {
        
        dispatch(httpRequest())
        httpPost('/api/auth/register', data)
            .then(res => {
                
                checkResponse(res)
                    ? dispatch(authSuccess(res.data))
                    : dispatch(authFailure(res.data))
            })
            .catch(error =>
                console.log(error)
                // тут тоже неплохо бы диспачнуть.
            )

    }
}

export function httpRequest() {
    return {
        type: SESSION_REQUEST,
        payload: '12'
    }
}

export function authSuccess(data) {
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}

export function authFailure(data) {
    return {
        type: AUTH_FAILURE,
        payload: data
    }
}

export function logIn(data) {
    return dispatch => {
        dispatch(httpRequest())
        httpPost('/api/auth/login', data)
            .then(res =>
                checkResponse(res)
                    ? dispatch(authSuccess(res.data))
                    : dispatch(authFailure(res.data))
            )
            .catch(error =>
                console.log(error)
            )

    }
}

export function setError(data) {
    return {
        type: SET_ERROR,
        payload: data
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}


export function logOut() {
    return {
        type: LOG_OUT
    }
}