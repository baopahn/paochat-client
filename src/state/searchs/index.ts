import { createSlice } from "@reduxjs/toolkit";
import { getInfoByKeyWord } from "api/feature";
import { Searchs } from "state/types";

const initialState: Searchs = { isSearch: false, result: [] };

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },

    setResult: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { setIsSearch, setResult } = searchSlice.actions;

export const fetchSearch = (key) => async (dispatch, getState) => {
  const listUser = await getInfoByKeyWord(key);
  dispatch(setResult(listUser));
};

export default searchSlice.reducer;
