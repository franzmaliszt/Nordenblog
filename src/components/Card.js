import React from 'react'

import '../css/Card.css'

function Card({ active, title, time, context, clickHandler }) {
    return (
        <div className={active ? 'card active' : 'card'} onClick={clickHandler}>
            <p className='card__title'>{title}</p>
            <p className='card__time'>{time}</p>
            <p className='card__context'>{context}</p>
        </div>
    )
}

export default Card
