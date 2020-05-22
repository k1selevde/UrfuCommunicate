import React from 'react';
import {connect} from "react-redux";
import {Routes} from "./components/Routes";
import HeaderContainer from "./containers/HeaderContainer";
import './App.css'


function App({isAuth}) {
  return (
    <div className="App">
        {isAuth && <HeaderContainer />}
        <div className="content">
            <Routes isAuth={isAuth}/>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
    isAuth: state.session.user.isAuth
})

export default connect(mapStateToProps)(App);