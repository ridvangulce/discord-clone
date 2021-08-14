import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice"
import {selectChannelId, selectChannelName} from "./features/appSlice";
import "./Chat.css"
import Message from "./Message";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle"
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard"
import GifIcon from "@material-ui/icons/Gif"
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions"
import db from "./firebase";
import firebase from "firebase";

const Chat = () => {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (channelId) {
            db.collection("channels")
                .doc(channelId).collection('messages')
                .orderBy("timestamp", 'desc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ));
        }
    }, [channelId])
    const [locations, setLocations] = useState({
        loaded: false,
        coordinates:
            {
                lat: "",
                lng: ""
            }
    });
    const Locations = (locations) => {
        setLocations({
            loaded: true,
            coords: {
                lat: locations.coords.latitude,
                lng: locations.coords.longitude
            }
        });

    };
    const onError = (error) => {
        setLocations({
            loaded: true,
            error,
        });
    };
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError()
            setLocations(state => ({
                ...state,
                loaded: true,
                error: {
                    code: 0,
                    message: "Geolocation not supported"
                }
            }))
        }
        navigator.geolocation.getCurrentPosition(Locations, onError)
    }, [])

    const sendMessage = e => {
        e.preventDefault()
        db.collection("channels")
            .doc(channelId).collection("messages")
            .add({
                message: input,
                user: user,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                locations: locations.coords
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        setInput("");
    }
    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>
            <div className="chat__messages">
                {messages.map((message) => (
                    <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}
                        locations={locations.coords}
                    />
                ))}

            </div>
            <div className="chat__input">
                <AddCircleIcon fontSize="large"/>
                <form>
                    <input value={input}
                           disabled={!channelId}
                           onChange={e => setInput(e.target.value)}
                           placeholder={`Message #${channelName}`}
                    />
                    <button className="chat__inputButton"
                            type="submit"
                            disabled={!channelId}
                            onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large"/>
                    <GifIcon fontSize="large"/>
                    <EmojiEmotionsIcon fontSize="large"/>
                </div>
            </div>
        </div>
    );
}

export default Chat;