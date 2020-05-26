import {checkResponse, httpPost, httpPostFiles} from "../../helpers/network";
import {API_ROOT} from "../../constants/Default";

import {
    GET_GROUP_FAILURE,
    GET_GROUP_REQUEST,
    GET_GROUP_SUCCESS,
    GET_NEW_STUDENT_FAILURE,
    GET_NEW_STUDENT_REQUEST,
    GET_NEW_STUDENT_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_PROFILE_SUCCESS,
    TEACHER_CLEAR_GROUP, TEACHER_CLEAR_GROUPCREATE,
    TEACHER_CLEAR_SAVECHANGE, TEACHER_CREATE_GROUP_FAILURE, TEACHER_CREATE_GROUP_REQUEST, TEACHER_CREATE_GROUP_SUCCESS,
    TEACHER_EDIT_GROUP_FAILURE,
    TEACHER_EDIT_GROUP_REQUEST,
    TEACHER_EDIT_GROUP_SUCCESS, TEACHER_FILE_FAILURE, TEACHER_FILE_REQUEST, TEACHER_FILE_SUCCESS,
    TEACHER_OUT,
    TEACHER_REQUEST,
    TEACHER_SEND_MESSAGE_FAILURE,
    TEACHER_SEND_MESSAGE_REQUEST,
    TEACHER_SEND_MESSAGE_SUCCESS,
} from "./actionTypes";


export function getProfile(data) {
    return (dispatch) => {
        dispatch(httpRequest())
        httpPost(`/api/teacher/teacherProfile`, data)
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
        httpPost(`/api/team/findStudent`, data)
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
        httpPost(`/api/teacher/teacherGroup`, data)
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

export function sendMessage(data) {
    return (dispatch) => {
        dispatch(sendMessageHttpRequest())
        httpPost(`/api/team/sendMessage`, data)
            .then(res => {
                console.log(res)
                (checkResponse(res)
                    ? dispatch(sendMessageSuccess(res.data))
                    : dispatch(sendMessageFailure(res.data)))
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}


export function sendMessageHttpRequest() {
    return {
        type: TEACHER_SEND_MESSAGE_REQUEST
    }
}

export function sendMessageSuccess(data) {
    return {
        type: TEACHER_SEND_MESSAGE_SUCCESS,
        payload: data
    }
}

export function sendMessageFailure(data) {
    return {
        type: TEACHER_SEND_MESSAGE_FAILURE,
        payload: data
    }
}

// EDIT GROUP

export function editGroup(data) {
    return (dispatch) => {
        console.log('request data (send message): ', data)
        dispatch(editGroupRequest())
        httpPost(`${API_ROOT}/editGroup`, data)
            .then(res => {
                console.log(res)
                (checkResponse(res)
                    ? dispatch(editGroupSuccess())
                    : dispatch(editGroupFailure(res.data)))
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}




export function editGroupRequest() {
    return {
        type: TEACHER_EDIT_GROUP_REQUEST
    }
}

export function editGroupSuccess() {
    return {
        type: TEACHER_EDIT_GROUP_SUCCESS,
        //payload: data
    }
}

export function editGroupFailure(data) {
    return {
        type: TEACHER_EDIT_GROUP_FAILURE,
        payload: data
    }
}

// на всякий случай clear saveChange: и errors - если научимся обрабатывать их

export function clearSaveChanges() {
    return {
        type: TEACHER_CLEAR_SAVECHANGE
    }
}


// TEACHER CREATE GROUP

export function createGroup(data) {
    return (dispatch) => {
        console.log('request data (create new group): ', data)
        dispatch(createGroupRequest())
        httpPost(`/api/team/createGroup`, data)
            .then(res => {
                (checkResponse(res)
                    ? dispatch(createGroupSuccess(res.data))
                    : dispatch(createGroupFailure(res.data)))
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}

export function createGroupRequest() {
    return {
        type: TEACHER_CREATE_GROUP_REQUEST
    }
}

export function createGroupSuccess(data) {
    return {
        type: TEACHER_CREATE_GROUP_SUCCESS,
        payload: data
    }
}

export function createGroupFailure(data) {
    return {
        type: TEACHER_CREATE_GROUP_FAILURE,
        payload: data
    }
}

export function clearGroupCreate() {
    return {
        type: TEACHER_CLEAR_GROUPCREATE
    }
}


export function sendFile(data) {
    return (dispatch) => {
        console.log('request data (send new File(s)): ', data)
        dispatch(sendFileRequest())
        httpPostFiles(`/api/teacher/sendFile`, data)
            .then(res => {
                (checkResponse(res)
                    ? dispatch(sendFileSuccess(res.data))
                    : dispatch(sendFileFailure(res.data)))
            })
            .catch(error =>
                    console.log(error)
                // по-хорошему dispatch надо делать
            )
    }
}



export function sendFileRequest() {
    return {
        type: TEACHER_FILE_REQUEST
    }
}

export function sendFileSuccess(data) {
    return {
        type: TEACHER_FILE_SUCCESS,
        payload: data
    }
}

export function sendFileFailure(data) {
    return {
        type: TEACHER_FILE_FAILURE,
        payload: data
    }
}