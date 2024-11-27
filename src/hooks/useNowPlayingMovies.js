import { useEffect } from "react";
import { ACCESS_TOKEN, MOVIE_NOW_PLAYING_API_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

// Fetching the data and appending to store.
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getMovieData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    const data = await fetch(MOVIE_NOW_PLAYING_API_URL, options);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json?.results));

    return json;
  };


  useEffect(() => { 
      getMovieData();
  }, []);
};

export default useNowPlayingMovies;
