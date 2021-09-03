import { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = (props) => {

    const [ posts, setPosts ] = useState({
        activeObject: 'Home',
        activeTag : 'New',
        objects: [],
        // newBanner: null,
        featured: false,
        newPost: {
            id: '',
            faetured: false,
            // banner: null,
            title: '',
            time: '',
            tag: [],
            context: ''
        }
    })

    return (
        <PostContext.Provider value={ {posts, setPosts} }>
            {props.children}
        </PostContext.Provider>
    );
}