import {combineReducers} from 'redux';
import sessionReducer from './sessionReducer'
import studentReducer from "./studentReducer";
import teacherReducer from "./teacherReducer";


export default combineReducers({
    session: sessionReducer,
    student: studentReducer,
    teacher: teacherReducer
})