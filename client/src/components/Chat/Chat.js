import React from 'react'
import cn from 'classnames'
import s from './Chat.module.css'


const Chat  = ({messages = [],teacher, isDayTheme}) => {
    return (
        <>
            {teacher &&
        <div className={cn(s.messagesWrap,
            {[s.messagesWrap__light]: isDayTheme}
            )}
        >
            {
                messages.map(mess => {
                    return (
                        <div className={cn(s.messWrap,
                            {[s.messWrap__light]: isDayTheme}
                        )}
                        >
                            <div className={s.messRow}>
                                <div className={s.messSender}>{teacher}</div>
                                <div className={s.messTime}>{mess.time}</div>
                            </div>
                            <p className={s.messText}>{mess.text}</p>

                        </div>
                    )
                })
            }
        </div>
        }
        </>
    );
}

export default Chat;