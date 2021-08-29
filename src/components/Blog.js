import React from 'react';

import '../css/Blog.css';

function Blog({ title, context, time }) {
    return (
        <div className='blog'>
            <h6 className='blog__time'>{time}</h6>
            <h1 className='blog__title'>{title}</h1>
            <hr/>
            <h4 className='blog__context'>{context}</h4>
        </div>
    );
}

export default Blog
