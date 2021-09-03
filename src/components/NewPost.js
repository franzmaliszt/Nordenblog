import React, { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { PostContext } from '../context/PostContext';

import PostForm from './PostForm';

import WhatshotIcon from '@material-ui/icons/Whatshot';
// import ImageIcon from '@material-ui/icons/Image';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import '../css/NewPost.css';

function NewPost() {

    const {posts, setPosts} = useContext(PostContext);
    const {theme, setTheme} = useContext(ThemeContext);

    // const inputBannerRef=useRef();

    function handleClick(e) {
        e.preventDefault();
        setTimeout(() => {
            setTheme({...theme, postMode: false});
        }, 1);
    }

    function handleFeatureClick() {
        setPosts({...posts, featured: !posts.featured});
    }

    // function handleBannerClick() {
    //     if (posts.newBanner !== null) {
    //         posts.newBanner = null
    //     } else {
    //         inputBannerRef.current.click();
    //     }
    // }

    // function onFileChange(e) {
    //     setPosts({...posts, newBanner: e.target.files[0]});
    // }

    return (
        <>
            {theme.postMode ? (
                <div className='popup'>
                    <div className='popup__inner'>
                        <button className='closeBtn' onClick={handleClick}>X</button>
                        <PostForm/>
                    </div>
                    <div className='side_options'>
                        {/* <div className='option' onClick={handleBannerClick}>
                            {posts.newBanner !== null ? (
                                <>
                                    <label className='option__text'>Remove</label>
                                    <HighlightOffIcon className='featureIcon active'/>
                                </>
                            ):(
                                <>
                                    <label className='option__text'>Set a Banner</label>
                                    <ImageIcon className={posts.newBanner !== null ? 'featureIcon active' : 'featureIcon'}/>
                                </>
                            )}
                            <input ref={inputBannerRef} type='file' onChange={onFileChange} accept='image/*' hidden />
                        </div> */}
                        <div className='option' onClick={handleFeatureClick}>
                            <label className='option__text'>Feature This!</label>
                            <WhatshotIcon className={posts.featured ? 'featureIcon active' : 'featureIcon'}/>
                        </div>
                    </div>
                </div>)
                : null
            }
        </>
    );
}

export default NewPost