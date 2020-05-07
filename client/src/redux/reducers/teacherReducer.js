import {GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS, TEACHER_OUT, TEACHER_REQUEST} from "../actions/actionTypes";

let initialState = {
    isLoading: false,
    errors: '',
    teacherInfo: {
        name: '',
        surname: '',
        patronymicL: ''
    },
    groups: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TEACHER_REQUEST:
            return {...state, isLoading: true}
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

        default:
            return state;
    }
}