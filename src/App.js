import React, {useEffect} from 'react';
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import "./App.css"
import {useDispatch, useSelector} from "react-redux";
import {login, selectUser,logout} from "./features/userSlice";
import Login from "./Login";
import io from "socket.io-client"
import {auth} from "./firebase";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const socket = io.connect("http://localhost:5000")
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            console.log("user is",authUser)
            if (authUser) {
                dispatch(login({
                    uid:authUser.uid,
                    photo:authUser.photoURL,
                    email:authUser.email,
                    displayName:authUser.displayName
                }))
            } else {
                dispatch(logout());
            }
        })
    },[dispatch])
    return (
        <div className="app">
            {user ? (
                <>
                    <Sidebar login={login}/>
                    <Chat/>
                </>
            ) : (
                <Login/>
            )}

        </div>
    );
};

export default App;