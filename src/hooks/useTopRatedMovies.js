import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN,MOVIE_TOP_RATED_API_URL } from "../utils/constant";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    const fetchTopRatedMovies = async () =>{

        const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        const data = await fetch(MOVIE_TOP_RATED_API_URL,options);
        const json = await data.json();
        return json.results;
        
    }

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await fetchTopRatedMovies();
            dispatch(addTopRatedMovies(data));
        }

        fetchAPI();


    },[])
}

export default useTopRatedMovies;