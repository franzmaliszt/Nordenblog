import React, { useContext } from 'react';
import { PostContext } from '../context/PostContext';

import Blog from './Blog';
import Home from './Home';

import '../css/Feed.css';

function Feed() {
    const {posts} = useContext(PostContext);
    const active = posts.activeObject;

    return (           
        <div className='feed'>
            {posts.activeObject === 'Home' ? 
                <Home></Home> 
            : 
                <Blog className='blog' title={active.title} context={active.context} time={active.time}/>}            
        </div>
    )
}

export default Feed;