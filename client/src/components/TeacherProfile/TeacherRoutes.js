import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import NewTeamContainer from '../../containers/NewTeamContainer'
import NotFound from '../NotFound/NotFound'
import TeacherHome from "./TeacherHome/TeacherHome";
import TeacherGroupContainer from "../../containers/TeacherGroupContainer";

export const TeacherRoutes = () => {
    return (
        <Switch>
            <Route path="/teacherProfile/newGroup" component={NewTeamContainer} />
            <Route path="/teacherProfile/edit" render={() => <NewTeamContainer isEdit={true}/>} />
            <Route path="/teacherProfile" exact component={TeacherHome} />
            <Route path="/teacherProfile/group-:id" render={({match}) =>
            {
                const {id} = match.params;
                console.log(match)
                return <TeacherGroupContainer groupId={id} />
            }} />
            <Route path="*" component={NotFound}/>
        </Switch>
    )
}