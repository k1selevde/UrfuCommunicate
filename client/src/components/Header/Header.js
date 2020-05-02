import React from 'react'
import ControlBtnContainer from "../../containers/ControlBtnContainer";
import s from "./Header.module.css"

const Header  = () => {
    return (
        <header className={s.container}>
            <div className={s.wrapper}>
                <span className={s.logo}>UrfUCommunicate</span>
                <div className={s.right}>
                    <div className={s.userName}>Петров Максим Алексеевич</div>
                    <ControlBtnContainer />
                </div>
            </div>
        </header>
    );
}

export default Header;