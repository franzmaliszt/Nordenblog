import React, { useContext, useEffect } from 'react';
import { GetPosts } from '../api';

import { PostContext } from '../context/PostContext';
import { ThemeContext } from '../context/ThemeContext';
import { WalletContext } from '../context/WalletContext';

import CreateIcon from '@material-ui/icons/Create';

import Card from './Card';
import NewPost from './NewPost';

import '../css/Sidebar.css';

function Sidebar() {

    const {posts, setPosts} = useContext(PostContext);
    const {theme, setTheme} = useContext(ThemeContext);
    const {wallet} = useContext(WalletContext);

    useEffect(() => {        
        res()
    }, []);
    
    let res = async () => {
        try {
            let data = await GetPosts()
            setPosts({...posts, objects: data})
        } catch (err) {
            console.log(err)
        }
    }

    function toggleActive(id) {
        setPosts({ ...posts, activeObject: posts.objects.find((post) => post.id === id ) });
    }

    function handleNewPost() {
        setTheme({...theme, postMode: true})
    }

    return (
        <div className="sidebar" id='sidebar'>
            <div className='sidebar__top'>
                {
                    !posts.length ? (
                        posts.objects.map(element => (
                            element.tag.includes(posts.activeTag) ? 
                            <Card key={element.id} active={posts.activeObject.id === element.id} title={element.title} time={element.time} context={element.context} clickHandler={ () => toggleActive(element.id) }/>
                            : ''
                    ))) : (
                        ''
                    )
                }
            </div>
            <div className="sidebar__footer">
                {wallet.logged ?
                    <div className='newPost' onClick={handleNewPost}>
                        <h3 className={'newPost__text'}>New Post</h3>
                        <CreateIcon className="newPost__icon"/>
                        <NewPost/>
                    </div>
                :
                    null
                }
            </div>
        </div>
    )
};

export default Sidebar;