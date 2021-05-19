import React from 'react'
import { Channel } from './components/Channel';
import {useUser} from './context/user'

export const AppChat = () => {
    const {user, login} = useUser();
    
    return (
        <div>
            <h1>App Chat</h1>
            {user ? <Channel/>: <div className="centered"><button className="button" onClick={login}>Login with google <i className="fas fa-sign-in-alt"></i></button></div>}
        </div>
    );
};
