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
        <div className="relative mx-auto  bg-black text-white">
            <div className="videotitle absolute left-0 top-[60%]  md:top-1/2 -translate-y-3/4  w-full p-4 text-white pointer-events-none">
                <h1 className="title text-2xl md:text-5xl mb-4 font-netflix font-bold">{title}</h1>
                <p className="desc text-[22px] max-w-[800px] font-netflix mb-4 hidden md:block">{overview}</p>
                {/* <button className="cta p-4 text-2xl font-bold bg-green-400 rounded-md">Subscribe</button> */}
            </div>
            <div className="video-bg w-full overflow-hidden pointer-events-none min-h-[300px]  h-l[calc(100vh-87px)] aspect-video">
                <iframe 
                    title="Trailer Frame"
                    className="w-[300%] h-full -ml-[100%] yt-player -mt-[60px]"
                    width="600" 
                    height="600" 
                    src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&showinfo=0&playlist=${trailerVideo?.key}`}
                    allow="autoplay; encrypted-media"
                ></iframe>
            </div>
        </div>
    )
}


export default ATFContainer;