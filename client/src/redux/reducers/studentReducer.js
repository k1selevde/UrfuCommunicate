import {
    GET_SUBJECTS_FAILURE,
    GET_SUBJECTS_SUCCESS, STUDENT_GET_FILE_REQUEST, STUDENT_GET_FILE_SUCCESS, STUDENT_GROUP_REQUEST,
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
    activeGroup: {
        groupId: '',
        title: '',
        description: '',
        teacher: '',
        messages: [],
        studentsList: [],
        files: [],
        currentFileGetting: ''
    },
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
                isLoading: false,
                activeGroup: action.payload.group
            }
        case STUDENT_SUB_GROUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload.message
            }
        case STUDENT_GET_FILE_REQUEST:
            return {
                ...state,
                activeGroup: {
                    ...state.activeGroup,
                    currentFileGetting: action.payload.fileName
                }
            }
        case STUDENT_GET_FILE_SUCCESS: {
            //const currentObj = state.activeGroup.files.filter(file => file.fileName === state.activeGroup.currentFileGetting)[0];
            var blob = new Blob([action.payload], { type: 'application/pdf' });
            //currentObj.filePath = URL.createObjectURL(blob);
            //currentObj.getFileStatus = true;
            const newFiles = state.activeGroup.files.map(file => {
                if (file.fileName === state.activeGroup.currentFileGetting) {
                    file.filePath = URL.createObjectURL(blob);
                    file.getFileStatus = true;
                    console.log('new file!11111:', file)
                }
                return file;
            });
            return {
                ...state,
                activeGroup: {
                    ...state.activeGroup,
                    files: [
                        //...state.activeGroup.files.filter(file => file.fileName !== state.activeGroup.currentFileGetting),
                        ...newFiles
                    ],

                }
            }
        }
        default: return state;
    }
}