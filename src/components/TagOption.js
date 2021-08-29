import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext';

import '../css/TagOption.css';

function TagOption({ active, tag, Icon, clickHandler }) {

    const {theme} = useContext(ThemeContext);

    return (
        <div className={`tag ${active ? 'active' : ''}`} onClick={clickHandler}>
            <Icon className="tag__icon"/>
            <h2 className={`tag__text ${theme.menu ? '' : 'inactive'}`}>{tag}</h2>
        </div>
    )
}

export default TagOption