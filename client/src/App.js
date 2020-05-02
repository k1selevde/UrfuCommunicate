import React from 'react';
import {Routes} from "./components/Routes";
import Header from "./components/Header/Header";
import {connect} from "react-redux";
import './App.css'


function App({isAuth}) {
  return (
    <div className="App">
        {isAuth && <Header />}
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
