import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN,MOVIE_POPULAR_API_URL } from "../utils/constant";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();

    const fetchPopularMovie = async () =>{

        const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        const data = await fetch(MOVIE_POPULAR_API_URL,options);
        const json = await data.json();
        return json.results;
        
    }

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await fetchPopularMovie();
            dispatch(addPopularMovies(data));
        }

        fetchAPI();


    },[])
}

export default usePopularMovies;