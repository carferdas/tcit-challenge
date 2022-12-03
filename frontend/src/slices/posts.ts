import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {}
});

export default postSlice.reducer;