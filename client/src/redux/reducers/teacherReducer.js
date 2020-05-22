import {
    GET_GROUP_FAILURE,
    GET_GROUP_REQUEST, GET_GROUP_SUCCESS,
    GET_NEW_STUDENT_FAILURE, GET_NEW_STUDENT_REQUEST,
    GET_NEW_STUDENT_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_PROFILE_SUCCESS, TEACHER_CLEAR_GROUP,
    TEACHER_OUT,
    TEACHER_REQUEST, TEACHER_SEND_MESSAGE_FAILURE, TEACHER_SEND_MESSAGE_REQUEST, TEACHER_SEND_MESSAGE_SUCCESS
} from "../actions/actionTypes";

let initialState = {
    isLoading: false,
    errors: '',
    teacherInfo: {
        name: '',
        surname: '',
        patronymicL: ''
    },
    groups: [],
    activeGroup: {},
    newStudent: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TEACHER_REQUEST:
            return {...state, isLoading: true}

        case GET_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: '',
                activeGroup: {}
            };

        case GET_GROUP_SUCCESS:
            return {
                ...state,
                activeGroup: action.payload.group
            };

        case GET_GROUP_FAILURE:
            return {
                ...state,
                errors: action.payload.message
            };

        case GET_NEW_STUDENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                errors: '',
                newStudent: []
            }

        case GET_NEW_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newStudent: action.payload.students
            }
        case GET_NEW_STUDENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload.message
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                teacherInfo: {
                    name: action.payload.name,
                    surname: action.payload.surname,
                    patronymic: action.payload.patronymic
                },
                groups: action.payload.groups,
                isLoading: false
            }
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                errors: action.payload.message,
                isLoading: false
            }
        case TEACHER_OUT:
            return {...initialState}
        case TEACHER_CLEAR_GROUP:
            return {
                ...state,
                errors: '',
                activeGroup: {}
            }

        case TEACHER_SEND_MESSAGE_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case TEACHER_SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                activeGroup: {
                    ...state.activeGroup,
                    messages: [...state.activeGroup.messages, action.payload.newMessage]
                },
                isLoading: false
            }
        case TEACHER_SEND_MESSAGE_FAILURE:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}