import React, { useContext, useState } from 'react';
import { PostContext } from '../context/PostContext';
import { WalletContext } from '../context/WalletContext';
import { ThemeContext } from '../context/ThemeContext';

// import WhatshotIcon from '@material-ui/icons/Whatshot';
import FlareIcon from '@material-ui/icons/Flare';
import LanguageIcon from '@material-ui/icons/Language';
import ExploreIcon from '@material-ui/icons/Explore';
import MemoryIcon from '@material-ui/icons/Memory';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EcoIcon from '@material-ui/icons/Eco';
import SchoolIcon from '@material-ui/icons/School';

import TagOption from './TagOption';

import '../css/TagBar.css';

function TagBar() {

    const [appState, setAppState] = useState({
        activeObject: { tag: 'World' },
        objects: [ 
            // { active: 'active', tag: 'Hot', Icon: WhatshotIcon }, 
            { active: 'active', tag: 'New', Icon: FlareIcon },
            { tag: 'World', Icon: LanguageIcon },
            { tag: 'Travel', Icon: ExploreIcon },
            { tag: 'Tech', Icon: MemoryIcon },
            { tag: 'Cinema', Icon: LocalMoviesIcon},
            { tag: 'Finance', Icon: AccountBalanceIcon},
            { tag: 'Eco', Icon: EcoIcon},
            { tag: 'Academic', Icon: SchoolIcon}
        ]
    });

    const {wallet, setWallet} = useContext(WalletContext);
    const {posts, setPosts} = useContext(PostContext);
    const {theme} = useContext(ThemeContext);

    function handleSignOut() {
        setWallet({ key: '', address: '', logged: false })
      }

    function toggleActive(index) {
        setAppState({ ...appState, activeObject: appState.objects[index] });
        setPosts({ ...posts, activeTag: appState.objects[index].tag });
    }

    function toggleActiveStyles(index) {
        return `${appState.activeObject.tag === appState.objects[index].tag ? 'active' : ''}`;
    }

    return (
        <div className={`tagBar ${theme.menu ? '' : 'inactive'}`}>
            {appState.objects.map((element, index) => (
                <TagOption key={index} active={toggleActiveStyles(index)} tag={element.tag} Icon={element.Icon} clickHandler={ () => toggleActive(index) }/>
            ))}
            {wallet.logged ? <ExitToAppIcon className='logout' onClick={handleSignOut}/> : ''}
        </div>
    );
}

export default TagBar;