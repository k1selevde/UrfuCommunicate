import React from 'react'
import ControlBtnContainer from "../../containers/ControlBtnContainer";
import Switcher from '../Switcher/Switcher'
import s from "./Header.module.css"

const Header  = ({info, isDayTheme, changeTheme}) => {
    return (
        <header className={s.container}>
            <div className={s.wrapper}>
                <div className={s.logoWrap}>
                    <Switcher
                        isDayTheme={isDayTheme}
                        changeTheme={changeTheme}
                    />
                    <span className={s.logo}>UrfUCommunicate</span>
                </div>
                <div className={s.right}>
                    <div className={s.userName}>
                        {info.name} &nbsp;
                        {info.patronymic} &nbsp;
                        {info.surname}

                    </div>
                    <ControlBtnContainer />
                </div>
            </div>
        </header>
    );
}

export default Header;