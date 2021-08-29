import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

import PostForm from './PostForm';

import '../css/NewPost.css';

function NewPost() {

    const {theme, setTheme} = useContext(ThemeContext);

    function handleClick(e) {
        e.preventDefault();
        setTimeout(() => {
            setTheme({...theme, postMode: false});
        }, 1);
    }

    return (
        <>
            {theme.postMode ? (
                <div className='popup'>
                    <div className='popup__inner'>
                        <button className='closeBtn' onClick={handleClick}>X</button>
                        <PostForm/>
                    </div>
                </div>)
                : null
            }
        </>
    );
}

export default NewPost