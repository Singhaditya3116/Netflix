import React from "react";
import { useEffect } from "react";
import useMainTrailer from "../hooks/useMainTrailer";
import { useSelector } from "react-redux";

const ATFContainer = ({movie}) => {

    let {id:movieId,title,overview} = movie;
    useMainTrailer(movieId);
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);


    if(!Object.keys(trailerVideo).length){
        // Load Shimmer
        return;
    }
    
    return (
        <div className="relative contain  mx-auto bg-white text-black">
            <div className="videotitle absolute left-0 top-1/2 -translate-y-1/2  w-full p-4 text-white">
                <h1 className="title text-6xl mb-4 font-semibold">{title}</h1>
                <p className="desc text-2xl max-w-[800px] mb-4">{overview}</p>
                <button className="cta p-4 text-2xl font-bold bg-green-400 rounded-md">Subscribe</button>
            </div>
            <div className="video-bg w-full  h-l[calc(100vh-87px)] aspect-video">
                <iframe 
                className="w-full h-full"
                    width="600" 
                    height="600" 
                    src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&autohide=1&controls=0&loop=1&modestbranding=1`}
                    allow="autoplay; encrypted-media"
                ></iframe>
            </div>
        </div>
    )
}


export default ATFContainer;