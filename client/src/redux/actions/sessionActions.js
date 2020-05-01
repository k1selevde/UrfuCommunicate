import {HIDE_ALERT, LOG_FAILURE, LOG_SUCCESS, REGISTER_SUCCESS, REQUEST, SET_ERROR} from "./actionTypes";
import {API_ROOT} from "../../constants/Default";
import {checkResponse, httpPost} from "../../helpers/network";

// export function showError(data) {
//     return async dispatch => {
//         dispatch(setError(data))
//         await setTimeout(() => hideAlert(), 1500)
//     }
// }

export function registerMe(data) {
    return dispatch => {
        dispatch(httpRequest())
        httpPost(`${API_ROOT}/register`,data)
            .then(res => checkResponse(res)
                ? dispatch(registerSuccess(res.data))
                : dispatch(registerFailure(res.message))
            )
            .catch (error =>
                console.log('bad')
            )

    }
}

export function httpRequest() {
    return {
        type: REQUEST
    }
}

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    }
}

export function registerFailure() {
    return {
        type: REGISTER_SUCCESS
    }
}



export function logIn(data) {
    return dispatch => {
        dispatch(httpRequest())
        httpPost(`${API_ROOT}/login`,data)
            .then(res => checkResponse(res)
                ? dispatch(loginSuccess(res.data))
                : dispatch(loginFailure(res.message))
            )
            .catch (error =>
                console.log('bad')
            )

    }
}

export function loginSuccess() {
    return {
        type: LOG_SUCCESS
    }
}

export function loginFailure() {
    return {
        type: LOG_FAILURE
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