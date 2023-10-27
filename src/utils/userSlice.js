import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState:{
        name : "",
        profilePic : "",
    },
    reducers : {
        setName: (state,action) =>{
            state.name = action.payload
        },
        setProfilePic : (state,action) =>{
            state.profilePic = action.payload
        },
        clearValue : (state,action) =>{
            return {name: "",profilePic : ""};
        },
    },
});

export const {setName, setProfilePic, clearValue} = userSlice.actions;

export default userSlice.reducer;