import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [],
    trailerVideo: [],
    popularMovies:[],
    upcomingMovies:[],
    topRatedMovies:[],
    geminiMovieNameList:[],
    geminiTmdbMovieDetailsList:[]
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
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addGeminiMovieNameList: (state,action) => {
      state.geminiMovieNameList = action.payload;
    },
    addGeminiTmdbMovieDetailsList: (state,action) => {
      state.geminiTmdbMovieDetailsList = action.payload;
    }

  },
});

export default movieSlice.reducer;

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies,addUpcomingMovies, addTopRatedMovies } = movieSlice.actions;
