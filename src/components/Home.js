import React from 'react'
import { getVersionName } from '../api/utils';

import '../css/Home.css';

function Home() {
    const version = getVersionName();
    return (
        <div className='home'>
            <h1 className='banner'>Rule out the censorship</h1>
            <h3> Truth matters. Let us carve it in stone. </h3>
            <h5 className='footNote'>{version}</h5>
        </div>
    )
}

export default Home