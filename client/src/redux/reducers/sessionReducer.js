import {
    AUTH_FAILURE,
    AUTH_SUCCESS,
    HIDE_ALERT,
    LOG_OUT,
    SESSION_REQUEST,
    SET_ERROR
} from "../actions/actionTypes";


let initialState = {
    user: {
        isAuth: false,
        isTeacher: null,
        id: null,
        token: null
    },
    errorMsg: "",
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT:
            return {...state, user: initialState.user}
        case SESSION_REQUEST:
            return {...state, isLoading: true}
        case AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {
                    isAuth: !!action.payload.id,
                    isTeacher: action.payload.isTeacher,
                    id: action.payload.id,
                    token: action.payload.token
                }
            }
        case AUTH_FAILURE:
            return {...state,isLoading: false, errorMsg: action.payload.message}
        case SET_ERROR:
            return {...state, errorMsg: action.payload}
        case HIDE_ALERT:
            return {...state, errorMsg: ""}
        default:  return state;
    }
}

