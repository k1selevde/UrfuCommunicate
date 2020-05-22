import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import RegisterContainer from "../containers/RegisterContainer";
import HomeContainer from "../containers/HomeContainer";
import StudentProfileContainer from "../containers/StudentProfileContainer";
import TeacherProfileContainer from "../containers/TeacherProfileContainer";


export const Routes = ({isAuth}) => {
    if (!isAuth) {
        return (
            <Switch>
                <Route path="/" exact component={HomeContainer}></Route>
                <Route path="/register" component={RegisterContainer}></Route>
                <Route path="*">
                    <Redirect to="/"></Redirect>
                </Route>

            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact component={HomeContainer}></Route>
            <Route path="/studentProfile" component={StudentProfileContainer} />
            <Route path="/teacherProfile" component={TeacherProfileContainer} />
            <Route path="*">
                <Redirect to="/"></Redirect>
            </Route>
        </Switch>
    )

}