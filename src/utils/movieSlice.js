import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [],
    trailerVideo: [],
    popularMovies:[],
    upcomingMovies:[]
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state,action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state,action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state,action) => {
      state.upcomingMovies = action.payload;
    }
  },
});

export default movieSlice.reducer;

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies,addUpcomingMovies } = movieSlice.actions;
