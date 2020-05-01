import {
    HIDE_ALERT,
    LOG_FAILURE,
    LOG_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    REQUEST,
    SET_ERROR
} from "../actions/actionTypes";


let initialState = {
    user: {
        isAuth: false,
        isTeacher: null,
        id: null,
        token: null
    },
    errorMsg: '',
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST:
            return {...state, isLoading: true}
        case LOG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {
                    isAuth: !!action.payload.id,
                    isTeacher: action.payload.isTeacher,
                    id: action.payload.id,
                    token: action.payload.token
                },
            }
        case LOG_FAILURE:
            return {...state, isLoading: false, errorMsg: action.payload}
        case SET_ERROR:
            return {...state, errorMsg: action.payload}
        case HIDE_ALERT:
            return {...state, errorMsg: ''}
        default:  return state;
    }
}

