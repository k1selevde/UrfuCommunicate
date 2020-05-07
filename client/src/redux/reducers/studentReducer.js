import {
    GET_SUBJECTS_FAILURE,
    GET_SUBJECTS_SUCCESS, STUDENT_GROUP_REQUEST,
    STUDENT_OUT,
    STUDENT_REQUEST, STUDENT_SUB_GROUP_FAILURE,
    STUDENT_SUB_GROUP_SUCCESS
} from "../actions/actionTypes";

let initialState = {
    isLoading: false,
    errors: '',
    studentInfo: {
        name: '',
        surname: '',
        patronymic: ''
    },
    activeGroup: {},
    subjects: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case STUDENT_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case STUDENT_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: '',
                activeGroup: {}
            }
        case GET_SUBJECTS_SUCCESS:
            return {
                ...state,
                studentInfo: {
                    name: action.payload.name,
                    surname: action.payload.surname,
                    patronymic: action.payload.patronymic
                },
                subjects: action.payload.subjects,
                isLoading: false
            }
        case GET_SUBJECTS_FAILURE:
            return {
                ...state,
                errors: action.payload.message,
                isLoading: false
            }

        case STUDENT_OUT:
            return {...initialState}

        case STUDENT_SUB_GROUP_SUCCESS:
            return {
                ...state,
                activeGroup: action.payload.group
            }
        case STUDENT_SUB_GROUP_FAILURE:
            return {
                ...state,
                errors: action.payload.message
            }
        default: return state;
    }
}