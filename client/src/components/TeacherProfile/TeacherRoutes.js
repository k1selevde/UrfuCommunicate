import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import NewTeam from '../NewTeam/NewTeam'

export const TeacherRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact/>
            <Route path="/teacherProfile/newTeam" component={NewTeam} />
            <Route path="/teacherProfile/edit" component={NewTeam} />
            <Route path="/teacherProfile/team:id" />
        </Switch>
    )
}