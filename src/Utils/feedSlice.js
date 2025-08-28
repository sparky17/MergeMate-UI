import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeUserFromFeed:(state,action)=>{
            const fromFeed=state.filter(r=>r._id!==action.payload);
            return fromFeed;
        },
        removeFeed:(state,action)=>{
            return null;
        }
    }
})

export const {addFeed,removeUserFromFeed,removeFeed}= feedSlice.actions;
export default feedSlice.reducer;