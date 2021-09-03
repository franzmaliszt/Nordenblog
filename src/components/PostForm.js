import React, { useContext, useState } from 'react';
import { Upload } from '../api';

import { PostContext } from '../context/PostContext';
import { ThemeContext } from '../context/ThemeContext';
import { WalletContext } from '../context/WalletContext';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../css/PostForm.css';

function PostForm() {

    const {posts, setPosts} = useContext(PostContext);
    const {theme, setTheme} = useContext(ThemeContext);
    const {wallet} = useContext(WalletContext);

    const [newPost, setNewPost] = useState({
        id: '',
        featured: false,
        // banner: null,
        title: '',
        time: new Date().toLocaleString().substring(0,9).replace(',', ''),
        tag: [],
        context: ''
    });

    function handleTitleChange(e) {
        setNewPost({...newPost, title: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        newPost.featured = posts.featured;
        // newPost.banner = posts.newBanner;
        
        setTheme({...theme, postMode: false});
        setPosts({...posts, objects: [...posts.objects, newPost]});

        try {
            Upload(newPost, wallet.key);
        } catch (e) {
            console.log(e);
        }
    }

    function handleOptionSelect(e) {
        setNewPost({...newPost, tag: newPost.tag.includes(e.target.textContent) ? 
            [...newPost.tag.filter((tag) => tag !== e.target.textContent)] : 
            [...newPost.tag, e.target.textContent]});
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input className='form__title' type='text' required={true} placeholder='Give it a title' value={newPost.title} onChange={handleTitleChange}/>
            <div className='form__editor'>
                <CKEditor editor={ClassicEditor} data={newPost.context} onChange={(e, editor) => {
                    const data = editor.getData();
                    setNewPost({...newPost, context: data});
                }}/>
            </div>
            <div className='form__tagList'>
                <div className={`form__option ${newPost.tag.includes('World') ? 'selected' : ''}`} onClick={handleOptionSelect}>World</div>
                <div className={`form__option ${newPost.tag.includes('Travel') ? 'selected' : ''}`} onClick={handleOptionSelect}>Travel</div>
                <div className={`form__option ${newPost.tag.includes('Tech') ? 'selected' : ''}`} onClick={handleOptionSelect}>Tech</div>
                <div className={`form__option ${newPost.tag.includes('Cinema') ? 'selected' : ''}`} onClick={handleOptionSelect}>Cinema</div>
                <div className={`form__option ${newPost.tag.includes('Finance') ? 'selected' : ''}`} onClick={handleOptionSelect}>Finance</div>
                <div className={`form__option ${newPost.tag.includes('Eco') ? 'selected' : ''}`} onClick={handleOptionSelect}>Eco</div>
                <div className={`form__option ${newPost.tag.includes('Academic') ? 'selected' : ''}`} onClick={handleOptionSelect}>Academic</div>
                {posts.featured && 
                    <label className='tipLabel'>You will tip %20 of the fee.</label>
                }
            </div>                
            <button className='form__submit' type='submit'>Submit</button>
        </form>
    )
}

export default PostForm