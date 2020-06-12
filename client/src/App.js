import React from 'react';
import {connect} from "react-redux";
import {Routes} from "./components/Routes";
import HeaderContainer from "./containers/HeaderContainer";
import './App.css'
import Helmet from "react-helmet"


function App({isAuth}) {
  return (
    <div className="App">
        <Helmet>
            <title>URFUCOMMUNICATE</title>
        </Helmet>
        {isAuth && <HeaderContainer />}
        <div className="content">
            <Routes isAuth={isAuth}/>
        </div>
    </div>
  );
}

/*
class App extends React.Component {

    componentWillMount()
     {
        document.title = 'URFUCOMMUNICATE'
    }

    render() {
        const {isAuth} = this.props;
        return (
            <div className="App">
                {isAuth && <HeaderContainer />}
                <div className="content">
                    <Routes isAuth={isAuth}/>
                </div>
            </div>
        );
    }

}
*/


const mapStateToProps = (state) => ({
    isAuth: state.session.user.isAuth
})

export default connect(mapStateToProps)(App);