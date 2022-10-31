import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { refreshAuth } from "../utils/lens/social/refreshToken";
// Type for our state


// Initial state
const initialState = {
  user: null,
  lensToken:null
};
const lensLogin = async () => {
  const lensToken = localStorage.getItem("LensToken")
  if(lensToken && lensToken !== ""){
    const response = await refreshAuth().catch((err) => {
      console.log(err)
      localStorage.setItem("LensToken", "")
    })
    if(response?.data?.refresh){
      localStorage.setItem("LensToken", JSON.stringify(response.data.refresh))
    }else{
      localStorage.setItem("LensToken", "")
    }
  }
} 
// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    // Action to set the user autentication status
    setUserState(state, action) {
      state.userState = action.payload;
      lensLogin()
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.user,
        };
      },
    },

  },
});

export const { setUserState } = userSlice.actions;

export const selectUserState = (state) => state.user.userState;

export default userSlice.reducer;