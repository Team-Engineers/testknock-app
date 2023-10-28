import { createSlice } from "@reduxjs/toolkit";
import {PORFILEPIC_URL} from './constants'

const userSlice = createSlice({
    name : "user",
    initialState:{
        user : null,
        userName : "Login",
        userPic : PORFILEPIC_URL,
    },
    reducers : {
        setUser: (state,action)=>{
            state.user = action.payload;
        },
        setName: (state, action) => {
            state.userName = action.payload; // Fix the assignment here
        },
        setProfilePicUrl: (state, action) => {
            state.userPic = action.payload; // Fix the assignment here
        },
        logoutUser : (state) =>{
            state.user = null;
        },
    },
});

export const {setUser, setName, setProfilePicUrl, logoutUser} = userSlice.actions;

export default userSlice.reducer;