import React from 'react'
import ControlBtnContainer from "../../containers/ControlBtnContainer";
import s from "./Header.module.css"

const Header  = ({info}) => {
    return (
        <header className={s.container}>
            <div className={s.wrapper}>
                <span className={s.logo}>UrfUCommunicate</span>
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