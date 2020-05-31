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
    TEACHER_CLEAR_SAVECHANGE,
    TEACHER_CREATE_GROUP_FAILURE,
    TEACHER_CREATE_GROUP_REQUEST,
    TEACHER_CREATE_GROUP_SUCCESS,
    TEACHER_EDIT_GROUP_FAILURE,
    TEACHER_EDIT_GROUP_REQUEST,
    TEACHER_EDIT_GROUP_SUCCESS, TEACHER_GET_FILE_FAILURE, TEACHER_GET_FILE_REQUEST, TEACHER_GET_FILE_SUCCESS,
    TEACHER_OUT,
    TEACHER_REQUEST, TEACHER_SEND_FILE_FAILURE, TEACHER_SEND_FILE_REQUEST, TEACHER_SEND_FILE_SUCCESS,
    TEACHER_SEND_MESSAGE_FAILURE,
    TEACHER_SEND_MESSAGE_REQUEST,
    TEACHER_SEND_MESSAGE_SUCCESS
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
    activeGroup: {
        groupId: '',
        title: '',
        description: '',
        teacher: '',
        messages: [],
        studentsList: [],
        saveChanges: false
    },
    newStudent: [],
    files: [
/*        {
            fileName: 'white_flow.pdf',
            filePath: '',
            getFileStatus: false,
            id: '12'
        },
        {
            fileName: 'blue_flow.pdf',
            filePath: '',
            getFileStatus: false,
            id: '45'
        }*/
    ],
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
                activeGroup: {},
                newStudent: [],
                files: []
            };

        case GET_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                activeGroup: {
                    ...state.activeGroup,
                    ...action.payload.group
                },
                // files: [...action.payload.files]
            };

        case GET_GROUP_FAILURE:
            return {
                ...state,
                isLoading: false,
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
                activeGroup: {},
                newStudent: []

            }

        case TEACHER_SEND_MESSAGE_REQUEST:
            return {
                ...state,
            }

        case TEACHER_SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                activeGroup: {
                    ...state.activeGroup,
                    messages: [...state.activeGroup.messages, action.payload.newMessage]
                },
            }
        case TEACHER_SEND_MESSAGE_FAILURE:
            return {
                ...state,
            }
        case TEACHER_EDIT_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case TEACHER_EDIT_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                activeGroup: {
                    ...state.activeGroup,
                    saveChanges: true
                },

            }
        case TEACHER_EDIT_GROUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload.message
            }
        case TEACHER_CLEAR_SAVECHANGE:
            return {
                ...state,
                activeGroup: {
                    ...state.activeGroup,
                    saveChanges: false
                },
                errors: ''
            }
        case TEACHER_CREATE_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case TEACHER_CREATE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                activeGroup: {
                    ...action.payload.group,
                    isGroupCreate: true
                },
                groups: [...state.groups,
                    {
                        title: action.payload.group.title,
                        id: action.payload.group.groupId
                    }
                ]
            }
        case TEACHER_CREATE_GROUP_FAILURE:
            return {
                ...state,
                isLoading: false
            }
        case TEACHER_CLEAR_GROUPCREATE:
            return {
                ...state,
                activeGroup: {
                    ...state.activeGroup,
                    isGroupCreate: false
                },
                errors: ''
            }
        case TEACHER_SEND_FILE_REQUEST:
            return {
                ...state
            }
        case TEACHER_SEND_FILE_SUCCESS:
            return {
                ...state,
                files: [...state.files, action.payload.file]
            }
        case TEACHER_SEND_FILE_FAILURE:
            return {
                ...state
            }
        case TEACHER_GET_FILE_REQUEST: {
            return {
                ...state
            }
        }
        case TEACHER_GET_FILE_SUCCESS: {
            const currentObj = state.filter(file => file.fileName === action.payload.file.fileName);
            var blob = new Blob([action.payload.data], { type: 'application/pdf' });
            currentObj.filePath = URL.createObjectURL(blob);
            return {
                ...state,
                files: [
                    ...state.files.filter(file => file.id !== action.payload.file.id),
                    currentObj
                ]
            }
        }
        case TEACHER_GET_FILE_FAILURE: {
            return {
                ...state,

            }
        }
        default:
            return state;
    }
}