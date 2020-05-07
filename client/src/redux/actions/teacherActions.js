import {checkResponse, httpPost} from "../../helpers/network";
import {API_ROOT} from "../../constants/Default";

import {
    GET_PROFILE_FAILURE,
    GET_PROFILE_SUCCESS, TEACHER_OUT, TEACHER_REQUEST,
} from "./actionTypes";


export function getProfile(data) {
    return (dispatch) => {
        dispatch(httpRequest())
        httpPost(`${API_ROOT}/teacherProfile`, data)
            .then(res => {
                checkResponse(res)
                    ? dispatch(getProfileSuccess(res.data))
                    : dispatch(getProfileFailure(res.data))
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}

export function httpRequest() {
    return {
        type: TEACHER_REQUEST
    }
}

export function getProfileSuccess(data) {
    return {
        type: GET_PROFILE_SUCCESS,
        payload: data
    }
}

export function getProfileFailure(data) {
    return {
        type: GET_PROFILE_FAILURE,
        payload: data
    }
}

export function teacherOut() {
    return {
        type: TEACHER_OUT
    }
}

/*TEACHER GET STUDENTS FOR CREATE TEAM*/



