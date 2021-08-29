import React, { useContext, useState } from 'react';
import { WalletContext } from '../context/WalletContext';
import { ThemeContext } from '../context/ThemeContext';
import { PostContext } from '../context/PostContext';
import arweave from '../api/arweave';

import Dropzone from 'react-dropzone';

import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import VpnKeyIcon from '@material-ui/icons/VpnKey'; 

import '../css/Header.css';

function Header() {

    const {wallet, setWallet} = useContext(WalletContext);
    const {theme, setTheme} = useContext(ThemeContext);
    const {posts, setPosts} = useContext(PostContext);
    const [keyDrop, setKeyDrop] = useState(false)

    function handleSignIn(key) {
        arweave.wallets.jwkToAddress(key).then((address) => {
            setWallet({ address: address, key: key, logged: true })
        });
    }

    function handleUpload(files) {
        files.forEach((file) => {
            let fileReader = new FileReader();
            fileReader.onload = function () {
                let key = JSON.parse(fileReader.result);
                handleSignIn(key);
            };
            fileReader.readAsText(file);
        });
        setKeyDrop(!keyDrop);
    };

    function toggleBar() {
        setTheme({...theme, menu: !theme.menu});
    }

    function toggleLogin() {
        setKeyDrop(!keyDrop);
    }

    return (        
        <div className='header'>
            <div className='header__left'>
                <MenuIcon className='toggleMenu' onClick={toggleBar}/>
                <p className='header__logo' onClick={() => setPosts({...posts, activeObject: 'Home'})}>Nordenblog</p>
            </div>
            {/* <div className='header__center'>
                <input placeholder='WORK IN PROGRES...' type='text'/>
                <SearchIcon className='header__inputButton'/>
            </div> */}
            <div className={`header__right ${wallet.logged ? 'inactive' : ''}`}>
                <VpnKeyIcon className='rightIcon' onClick={toggleLogin}/>
                <div className={`dropZone ${keyDrop ? '' : 'inactive'}`}>
                    <Dropzone onDropAccepted={handleUpload}>
                        {({getRootProps, getInputProps}) => (
                            <div className="upload" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p className='dropZone__text'>Select or drag arweave wallet keyfile to login</p>
                            </div>          
                        )}              
                    </Dropzone>
                </div>
            </div>
        </div>        
    );
}

export default Header