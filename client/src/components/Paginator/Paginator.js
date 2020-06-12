import React, {useState} from 'react'
import s from './Paginator.module.css'

const Paginator  = ({
    totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize = 5
    }) => {

    let pagesCount = Math.ceil(totalItemsCount/pageSize)
    let [portionNumber, setPortionNumber] = useState(1)


    return (
        <div className={s.paginator}>
            {portionNumber > 1 && <button
                onClick={() => {
                    setPortionNumber(portionNumber - 1);
                }}
            >
                PREV
            </button>}

            {portionCount > portionNumber && <button
                onClick={() => {
                     setPortionNumber(portionNumber + 1)
                }}
            >
                NEXT
            </button>}
        </div>
    );
}

export default Paginator;