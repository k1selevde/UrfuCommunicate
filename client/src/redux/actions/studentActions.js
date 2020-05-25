import {
    GET_SUBJECTS_FAILURE,
    GET_SUBJECTS_SUCCESS, STUDENT_GROUP_REQUEST,
    STUDENT_OUT,
    STUDENT_REQUEST, STUDENT_SUB_GROUP_FAILURE,
    STUDENT_SUB_GROUP_SUCCESS
} from "./actionTypes";

import {checkResponse, httpPost} from "../../helpers/network";
import {API_ROOT} from "../../constants/Default";

export function getSubjects(data) {
    return (dispatch) => {
        dispatch(httpRequest())
        httpPost(`${API_ROOT}/studentProfile`, data)
            .then(res => {
                checkResponse(res)
                    ? dispatch(getSubjectsSuccess(res.data))
                    : dispatch(getSubjectsFailure(res.data))
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}

export function httpRequest() {
    return {
        type: STUDENT_REQUEST
    }
}

export function getSubjectsSuccess(data) {
    return {
        type: GET_SUBJECTS_SUCCESS,
        payload: data
    }
}



export function getSubjectsFailure(data) {
    return {
        type: GET_SUBJECTS_FAILURE,
        payload: data
    }
}

export function studentOut() {
    return {
        type: STUDENT_OUT
    }
}



export function getSubjectGroup(data) {
    return (dispatch) => {
        dispatch(httpGroupReguest())
        httpPost(`${API_ROOT}/studentGroup`, data)
            .then(res => {
                checkResponse(res)
                    ? dispatch(getSubGroupSuccess(res.data))
                    : dispatch(getSubGroupFailure(res.data))
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}



export function getSubGroupSuccess(data) {
    return {
        type: STUDENT_SUB_GROUP_SUCCESS,
        payload: data
    }
}

export function getSubGroupFailure(data) {
    return {
        type: STUDENT_SUB_GROUP_FAILURE,
        payload: data
    }
}


export function httpGroupReguest() {
    return {
        type: STUDENT_GROUP_REQUEST
    }
}