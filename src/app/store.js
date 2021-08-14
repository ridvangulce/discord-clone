import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";
import locationReducer from "../features/locationSlice"
export default configureStore({
    reducer:{
        user:userReducer,
        app:appReducer,
        location:locationReducer
    }
})