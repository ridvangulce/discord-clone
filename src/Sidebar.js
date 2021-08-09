import React, {useState, useEffect} from 'react';
import SidebarChannel from "./SidebarChannel"
import "./Sidebar.css"
import {IconButton} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import AddIcon from "@material-ui/icons/Add";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import {Avatar} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic"
import HeadsetIcon from "@material-ui/icons/Headset"
import SettingsIcon from "@material-ui/icons/Settings"
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import db, {auth} from "./firebase";
import VideoChat from "./VideoChat";


const Sidebar = () => {
    const [channels, setChannels] = useState([]);
    const [videoChat, setVideoChat] = useState(false)
    const onClick = () => setVideoChat(!videoChat);
    const handleAddChannel = () => {
        const channelName = prompt("Enter New Channel Name");
        if (channelName) {
            db.collection('channels').add({
                channelName: channelName
            })
        }
    }
    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => {
            setChannels(snapshot.docs.map(doc => ({
                    id: doc.id,
                    channel: doc.data()
                }))
            );
        })
    }, [])

    const user = useSelector(selectUser)
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Discord Clone</h3>
                <IconButton>
                    <ExpandMoreIcon/>
                </IconButton>
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <h4>Text Channels</h4>
                    </div>
                    <IconButton>
                        <AddIcon onClick={handleAddChannel} className="sidebar__addChannel"/>
                    </IconButton>
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({id, channel}) => (
                        <SidebarChannel key={id} id={id} channelName={channel.channelName}/>
                    ))}
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon
                    className="sidebar__voiceIcon"
                    fontSize="large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <IconButton>
                        <InfoOutlinedIcon className="sidebar__voiceIconsInfo"/>
                    </IconButton>
                    <IconButton>
                        <PhotoCameraIcon className="sidebar__voiceIconsCamera"
                                         onClick={onClick}
                        />
                    </IconButton>

                </div>
            </div>
            {videoChat === true && <VideoChat/>}
            <div className="sidebar__profile">
                <IconButton>
                    <Avatar onClick={() => auth.signOut()} src={user.photo}/>
                </IconButton>
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>{user.uid.substring(0, 5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <IconButton>
                        <MicIcon className="sidebar__profileIconsMic"/>
                    </IconButton>
                    <IconButton>
                        <HeadsetIcon className="sidebar__profileIconsHeadset"/>
                    </IconButton>
                    <IconButton>
                        <SettingsIcon className="sidebar__profileIconsSettings"/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;

