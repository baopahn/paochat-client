import { createSlice } from "@reduxjs/toolkit";
import { getInfoById } from "api/feature";
import { Profile } from "state/types";

const initialState: Profile = {
  user: { _id: "", avatar: "", fullName: "", email: "" },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export const fetchProfile = (id) => async (dispatch, getState) => {
  const user = await getInfoById(id);
  dispatch(setProfile(user));
};

export default profileSlice.reducer;
