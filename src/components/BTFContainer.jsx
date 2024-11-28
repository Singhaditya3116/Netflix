import React from "react";
import { useSelector } from "react-redux";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MovieSection from "./MovieSection";


export const BTFContainer = () => {

    usePopularMovies();
    useUpcomingMovies();
    const movies = useSelector((store) => store.movies);

    return (
        <div className="bg-black text-white">
            <MovieSection title="Popular Movies" movies={movies.popularMovies}/>
            <MovieSection title="Upcoming Movies" movies={movies.upcomingMovies}/>
        </div>
    )
}


export default BTFContainer