import React from 'react'
import s from './Switcher.module.css'
import cn from 'classnames'

const Switcher  = ({isDayTheme,changeTheme}) => {
    const themeClickHandler = () => {
        changeTheme()
    }
    return (
        <>
            <div className={s.toggleWrapper}>
                <input
                    onChange={themeClickHandler}
                    type="checkbox"
                    className={s.dn}
                    id="dn"
                    checked={!isDayTheme}
                />
                <label htmlFor="dn" className={s.toggle}>
                    <span className={s.toggle__handler}>
                      <span className={cn(s.crater,{[s.crater1]: true})}></span>
                      <span className={cn(s.crater,s.crater2)}></span>
                      <span className={cn(s.crater,s.crater3)}></span>
                    </span>
                    <span className={cn(s.star,s.star1)}></span>
                    <span className={cn(s.star,s.star2)}></span>
                    <span className={cn(s.star,s.star3)}></span>
                    <span className={cn(s.star,s.star4)}></span>
                    <span className={cn(s.star,s.star5)}></span>
                    <span className={cn(s.star,s.star6)}></span>
                </label>
            </div>
        </>
    );
}

export default Switcher;