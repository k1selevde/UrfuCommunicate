import {checkResponse, httpPost} from "../../helpers/network";
import {API_ROOT} from "../../constants/Default";

import {
    GET_GROUP_FAILURE,
    GET_GROUP_REQUEST, GET_GROUP_SUCCESS,
    GET_NEW_STUDENT_FAILURE, GET_NEW_STUDENT_REQUEST,
    GET_NEW_STUDENT_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_PROFILE_SUCCESS, TEACHER_CLEAR_GROUP, TEACHER_OUT, TEACHER_REQUEST, TEACHER_SEND_MESSAGE_REQUEST,
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
export function getNewStudent(data) {
    return (dispatch) => {
        dispatch(getStudentHttpRequest())
        httpPost(`${API_ROOT}/findStudent`, data)
            .then(res => {
                checkResponse(res)
                    ? dispatch(getNewStudentSuccess(res.data))
                    : dispatch(getNewStudentFailure(res.data))
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}

export function getStudentHttpRequest() {
    return {
        type: GET_NEW_STUDENT_REQUEST
    }
}

export function getNewStudentSuccess(data) {
    return {
        type: GET_NEW_STUDENT_SUCCESS,
        payload: data
    }
}

export function getNewStudentFailure(data) {
    return {
        type: GET_NEW_STUDENT_FAILURE,
        payload: data
    }
}

/*GET GROUP*/

export function getGroup(data) {
    return (dispatch) => {
        console.log('request data: ', data)
        dispatch(getGroupHttpRequest())
        httpPost(`${API_ROOT}/teacherGroup`, data)
            .then(res => {
                console.log(res)
                (checkResponse(res)
                    ? dispatch(getGroupSuccess(res.data))
                    : dispatch(getGroupFailure(res.data)))
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}


export function getGroupHttpRequest() {
    return {
        type: GET_GROUP_REQUEST
    }
}


export function getGroupSuccess(data) {
    return {
        type: GET_GROUP_SUCCESS,
        payload: data
    }
}


export function getGroupFailure(data) {
    return {
        type: GET_GROUP_FAILURE,
        payload: data
    }
}


/*Clear group and error */

export function clearGroup() {
    return {
        type: TEACHER_CLEAR_GROUP
    }
}

/*teacher send message*/

export function sendMessageHttpRequest() {
    return {
        type: TEACHER_SEND_MESSAGE_REQUEST
    }
}

export function sendMessageSuccess(data) {
    return {
        type: TEACHER_SEND_MESSAGE_REQUEST,
        payload: data
    }
}

export function sendMessageFailure(data) {
    return {
        type: TEACHER_SEND_MESSAGE_REQUEST,
        payload: data
    }
}




