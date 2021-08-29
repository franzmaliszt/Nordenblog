import React from 'react';

import { PostProvider } from './context/PostContext';
import { WalletProvider } from './context/WalletContext';
import { ThemeProvider } from './context/ThemeContext';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Feed from './components/Feed';
import TagBar from './components/TagBar';

import './css/App.css';

function App() {  

  return (
    <ThemeProvider>
      <WalletProvider>
        <PostProvider>
          <div className='app'>
            <Header/>
              <div className='page'>
                <TagBar/>
                <Sidebar/>
                <Feed/>
              </div>
          </div>
        </PostProvider>
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App