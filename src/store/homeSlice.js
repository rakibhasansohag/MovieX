import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: null,
    genres: null,
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      if (action.payload !== null) {
        state.url = action.payload;
      }
    },
    getGenres: (state, action) => {
      if (action.payload !== null) {
        state.genres = action.payload;
      }
    },
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;

/// v1 code =>  if the v2 code doesn't work will use this
// import { createSlice } from "@reduxjs/toolkit";

// export const homeSlice = createSlice({
//   name: "home",
//   initialState: {
//     url: {},
//     genres: {},
//   },
//   reducers: {
//     getApiConfiguration: (state, action) => {
//       state.url = action.payload;
//     },
//     getGenres: (state, action) => {
//       state.genres = action.payload;
//     },
//   },
// });

// export const { getApiConfiguration, getGenres } = homeSlice.actions;

// export default homeSlice.reducer;
