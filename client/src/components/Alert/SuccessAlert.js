import React from 'react'
import cn from 'classnames'
import s from './Alert.module.css'

const SuccessAlert  = ({text,children}) => {
    return (
        <div className={cn(s.sucContainer,
            {[s.sucContainer__light]: true}
            )}
        >
            <div
                className={cn(s.sucText,
                    {[s.sucText__light]: true}
                    )}
            >
                {text}
            </div>
            <div className={s.sucChildrenLink}>{children}</div>
        </div>
    );
}

export default SuccessAlert;