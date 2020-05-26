import React from 'react'
import {connect} from "react-redux";
import Spinner from '../components/Spinner/Spinner'

const mapStateToProps = (state) => ({
    isLoadingTeacher: state.teacher.isLoading,
    isLoadingStudent: state.student.isLoading
})


export const  withSpinner = (Component,isTeacher) => connect(mapStateToProps,null)(
    class WithSpinnerHOC extends React.Component {
        render() {
            const {isLoadingTeacher, isLoadingStudent} = this.props;
            const isLoading = isTeacher ? isLoadingTeacher : isLoadingStudent;
            if (isLoading) {
                return (
                    <Spinner/>
                )
            }
            return (
                    <Component {...this.props}/>
            );

        }
    }
)

