import React from 'react';
import "./Login.css"
import {auth, provider} from './firebase';
import {Button} from "@material-ui/core";

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://logovtor.com/wp-content/uploads/2020/07/discord-logo-vector.png" alt=""/>
            </div>
                <Button onClick={signIn}>Sign In</Button>


        </div>
    );
}

export default Login;