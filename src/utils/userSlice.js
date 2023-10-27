import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState:{
        userName : "",
        userPic : "",
    },
    reducers : {
        setName: (state, action) => {
            state.userName = action.payload; // Fix the assignment here
        },
        setProfilePic: (state, action) => {
            state.userPic = action.payload; // Fix the assignment here
        },
        clearValue : (state,action) =>{
            return {userName: "",userPic : ""};
        },
    },
});

export const {setName, setProfilePic, clearValue} = userSlice.actions;

export default userSlice.reducer;