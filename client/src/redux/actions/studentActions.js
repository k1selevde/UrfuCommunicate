import {GET_SUBJECTS_FAILURE, GET_SUBJECTS_SUCCESS, STUDENT_REQUEST} from "./actionTypes";
import {checkResponse, httpGet} from "../../helpers/network";
import {API_ROOT} from "../../constants/Default";

export function getSubjects() {
    return (dispatch) => {
        dispatch(httpRequest())
        httpGet(`${API_ROOT}/studentProfile`)
            .then(res => {
                //console.log('res: ', res)
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

export function getSubjectsSuccess() {
    return {
        type: GET_SUBJECTS_SUCCESS,
    }
}

export function getSubjectsFailure() {
    return {
        type: GET_SUBJECTS_FAILURE,
    }
}






