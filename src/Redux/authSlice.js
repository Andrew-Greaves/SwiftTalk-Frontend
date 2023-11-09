import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername} = authSlice.actions;
export const selectUsername = (state) => state.auth.username;
export default authSlice.reducer;
