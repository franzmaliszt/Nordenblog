import { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = (props) => {

    const [ posts, setPosts ] = useState({
        activeObject: 'Home',
        activeTag : 'New',
        objects: []
    })

    return (
        <PostContext.Provider value={ {posts, setPosts} }>
            {props.children}
        </PostContext.Provider>
    );
}