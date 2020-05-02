import {GET_SUBJECTS_FAILURE, GET_SUBJECTS_SUCCESS, STUDENT_REQUEST} from "../actions/actionTypes";

let initialState = {
    isLoading: false,
    errors: '',
    subjects: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case STUDENT_REQUEST:
            return {...state, isLoading: true}
        case GET_SUBJECTS_SUCCESS:
            return {...state,
                subjects: action.payload.data,
                isLoading: false
            }
        case GET_SUBJECTS_FAILURE:
            return {
                ...state,
                errors: action.payload.data,
                isLoading: false
            }
        default: return state;
    }
}