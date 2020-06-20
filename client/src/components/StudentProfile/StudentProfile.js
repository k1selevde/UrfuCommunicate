import React from 'react'
import {Switch,Route} from "react-router-dom";
import cn from 'classnames'
import SubjectItem from "./SubjectItem";
import NotFound from "../NotFound/NotFound";
import SubjectGroupContainer from "../../containers/SubjectGroupContainer";
import StudentHomeContainer from "../../containers/StudentHomeContainer";
import s from './StudentProfile.module.css'

class StudentProfile extends React.Component {
    render() {
        const {subjects, isDayTheme} = this.props
        return (
            <div className={s.container}>
                <div className={s.subjectsWrapper}>
                    {subjects.map(sub => {
                        return (
                            <SubjectItem  sub={sub}/>
                        )
                    })
                    }
                </div>
                <div className={cn(s.Wrapper,
                        {[s.Wrapper__light]: isDayTheme}
                    )}
                >
                    <Switch>
                        <Route path="/studentProfile" exact component={StudentHomeContainer} />
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
            </div>
        )
    }
}

export default StudentProfile;