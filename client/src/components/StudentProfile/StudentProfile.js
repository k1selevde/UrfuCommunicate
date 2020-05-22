import React from 'react'
import {Switch,Route} from "react-router-dom";
import SubjectItem from "./SubjectItem";
import NotFound from "../NotFound/NotFound";
import StudentHome from "./StudentHome/StudentHome"
import s from './StudentProfile.module.css'
import SubjectGroupContainer from "../../containers/SubjectGroupContainer";

class StudentProfile extends React.Component {
    render() {
        const {subjects} = this.props
        return (
            <div className={s.container}>
                <div className={s.Wrapper}>
                    <Switch>
                        <Route path="/studentProfile" exact component={StudentHome} />
                        <Route path="/studentProfile/sub-:id" render={({match}) =>
                        {
                            const {id} = match.params;
                            return <SubjectGroupContainer subId={id} />
                        }} />
                        <Route path="*" render={() => <NotFound
                            textToBack={'Вернуться на главную'}
                            linkToBack={"/studentProfile"}
                            />
                        }/>
                    </Switch>
                </div>

                <div className={s.subjectsWrapper}>
                    {subjects.map(sub => {
                        return (
                                <SubjectItem  sub={sub}/>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}

export default StudentProfile;