import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MOVIE_TRAILER_API_URL, ACCESS_TOKEN } from "../utils/constant";
import { addTrailerVideo } from "../utils/movieSlice";

const useMainTrailer = (movieId) => {
	const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options);
    const json = await data.json();
	  const trailerMovie = json?.results.find((item) => item?.type === "Trailer");
    return trailerMovie;
  };
  

  useEffect(() => {
	const fetchTrailer = async () => {
		if (!movieId) {
			return;
		}

		const trailer = await getMovieTrailer();
		dispatch(addTrailerVideo(trailer));
	};

    fetchTrailer();
  }, [movieId]);

//   return [trailerMovie, setTrailerMovie];
};

export default useMainTrailer;
