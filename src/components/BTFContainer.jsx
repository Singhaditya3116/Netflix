import React from "react";
import { useSelector } from "react-redux";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import MovieSection from "./MovieSection";


export const BTFContainer = () => {

    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    const movies = useSelector((store) => store.movies);

    return (
        <div className="relative -top-[60px]  px-4  mx-auto bg-black text-white">
            <MovieSection title="Popular Movies" movies={movies.popularMovies}/>
            <MovieSection title="Top Rated Movies" movies={movies.topRatedMovies}/>
            <MovieSection title="Upcoming Movies" movies={movies.upcomingMovies}/>
        </div>
    )
}


export default BTFContainer