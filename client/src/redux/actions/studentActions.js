import {
    GET_SUBJECTS_FAILURE,
    GET_SUBJECTS_SUCCESS,
    STUDENT_GET_FILE_FAILURE,
    STUDENT_GET_FILE_REQUEST,
    STUDENT_GET_FILE_SUCCESS,
    STUDENT_GROUP_REQUEST,
    STUDENT_OUT,
    STUDENT_REQUEST,
    STUDENT_SUB_GROUP_FAILURE,
    STUDENT_SUB_GROUP_SUCCESS,
    TEACHER_GET_FILE_FAILURE,
    TEACHER_GET_FILE_REQUEST,
    TEACHER_GET_FILE_SUCCESS
} from "./actionTypes";

import {checkResponse, httpPost, httpPostGetFile} from "../../helpers/network";
import {API_ROOT} from "../../constants/Default";

export function getSubjects(data) {
    return (dispatch) => {
        dispatch(httpRequest())
        httpPost(`/api/student/studentProfile`, data)
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
        httpPost(`/api/student/studentGroup`, data)
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

export function getFile(data) {
    return (dispatch) => {
        console.log('request data (GET File please (student)): ', data)
        dispatch(getFileRequest(data))
        httpPostGetFile(`/api/team/getFile`, data)
            .then(res => {
                console.log('res: ', res)
                /*(checkResponseGetFile(res)
                    ? dispatch(getFileSuccess(res.data))
                    : dispatch(getFileFailure(res.data)))*/
                dispatch(getFileSuccess(res.data));
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}

export function getFileRequest(data) {
    return {
        type: STUDENT_GET_FILE_REQUEST,
        payload: data
    }
}

export function getFileSuccess(data) {
    return {
        type: STUDENT_GET_FILE_SUCCESS,
        payload: data
    }
}

export function getFileFailure(data) {
    return {
        type: STUDENT_GET_FILE_FAILURE,
        payload: data
    }
}