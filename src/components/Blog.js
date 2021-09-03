import React from 'react';
import parse from 'html-react-parser';

import '../css/Blog.css';

function Blog({ title, context, time }) {
    return (
        <div className='blog'>
            <h6 className='blog__time'>{time}</h6>
            <h1 className='blog__title'>{title}</h1>
            <hr/>
            <p className='blog__context'>{parse(context)}</p>
        </div>
    );
}

export default Blog
