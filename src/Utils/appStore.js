import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Utils/userSlice"
import feedReducer from "../Utils/feedSlice"
import ConnectionReducer from "../Utils/connectionsSlice";
import requestSlice from "./requestSlice";


const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:ConnectionReducer,
        requests:requestSlice,
    },
});

export default appStore;