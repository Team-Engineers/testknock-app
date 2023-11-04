import { createSlice } from "@reduxjs/toolkit";
import { PROFILEPIC_URL } from "./constants";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    name: "",
    password: "",
    profilePic: PROFILEPIC_URL,
    isAdmin: "",
    branch: "",
    year: "",
    contact: "",
    institute: "",
    accessLevel: "",
    userId: "",
    subject: {
      math: 0,
      lr: 0,
      varc: 0,
      di: 0,
    },
    social: {
      portfolio: "",
      github: "",
      linkedin: "",
    },
  },
  reducers: {
    setSliceEmail: (state, action) => {
      state.email = action.payload;
    },
    setSliceName: (state, action) => {
      state.name = action.payload; // Fix the assignment here
    },
    setSliceProfilePic: (state, action) => {
      state.profilePic = action.payload; // Fix the assignment here
    },
    setSliceIsAdmin: (state, action) => {
      state.isAdmin = action.payload; // Fix the assignment here
    },
    setSliceBranch: (state, action) => {
      state.branch = action.payload; // Fix the assignment here
    },
    setSliceYear: (state, action) => {
      state.year = action.payload; // Fix the assignment here
    },
    setSliceContact: (state, action) => {
      state.contact = action.payload; // Fix the assignment here
    },
    setSliceInstitute: (state, action) => {
      state.institute = action.payload; // Fix the assignment here
    },
    setSliceAccessLevel: (state, action) => {
      state.accessLevel = action.payload; // Fix the assignment here
    },
    setSliceUserId: (state, action) => {
      state.userId = action.payload; // Fix the assignment here
    },
    setSliceSocial : (state,action) =>{
      state.social.github = action.payload.github;
      state.social.portfolio = action.payload.portfolio;
      state.social.linkedin = action.payload.linkedin;

    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  setSliceEmail,
  setSliceName,
  setSliceProfilePic,
  setSliceIsAdmin,
  setSliceBranch,
  setSliceYear,
  setSliceContact,
  setSliceInstitute,
  setSliceAccessLevel,
  setSliceUserId,
  logoutUser,
  setSliceSocial,
} = userSlice.actions;

export default userSlice.reducer;
