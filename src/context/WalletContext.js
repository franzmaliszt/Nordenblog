import { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = (props) => {

    const [wallet, setWallet] = useState({
        key: '',
        address: '',
        logged: false
    })

    return (
        <WalletContext.Provider value={ {wallet, setWallet} }>
            {props.children}
        </WalletContext.Provider>
    );
}