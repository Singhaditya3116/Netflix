import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ACCESS_TOKEN } from "../utils/constant";
import MovieSection from "./MovieSection";

const MovieRecommendation = () => {
  const [query, setQuery] = useState("");
  const [movieNameList,setMovieNameList] = useState([]);
  const [movieDetails,setMovieDetails] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  async function getMovieDetails(moviesList){
    const promiseArray = moviesList.map((movie) => fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}`,options))
    return Promise.all(promiseArray)
      .then((response) => Promise.all(response.map(res => res.json())))
      .then((jsonResponses) => jsonResponses.map(res => res?.results))
      // .then((data) => data)
      .catch(error => console.log("Something Went Wrong",error))
    
  }

  useEffect(() => {
    if(movieNameList.length){
      (async () => {
        getMovieDetails(movieNameList)
        .then(data =>  setMovieDetails(data))
      })();

    }
  },[movieNameList])

  const callAPI = async () => {
    const genAI = new GoogleGenerativeAI("AIzaSyA5YPhoSaQrR1sHl0UswxfqZjfSwfQwi9Q");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Give me a list of top 5 movies name list for this query:" + query + ". Give me in a comma seperated values.If an random string or you are not able to find list give me an empty response eg. ''.Example: 'RRR','Pushpa','Tees Maar Khan','Sherlock Homes','Veer Zaara' ";

    const result = await model.generateContent(prompt);
    const data = result.response.text().split(",");
    
    setMovieNameList(data);
    // console.log(result.response.text());
  };



  // console.log("ML :",movieNameList);
  console.log("MDetails :",movieDetails);

  
  return (
    <div className="main flex flex-col justify-between min-h-full">
      <div className="main-inner-wrap flex-1">
        <Header className="hidden" />
        <main>
          <div className="container max-w-[482px] mx-auto px-4">
            <div className="py-12 px-8 md:px-[68px] text-white bg-[rgba(0,0,0,0.7)] rounded">
              <div>
                <input value={query} onChange={(e) => setQuery(e.target.value)} className="text-black"/>
                <button className="p-3 bg-green-500" onClick={callAPI}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="container max-w-[1232px] mx-auto px-4">
          {
              movieDetails?.map((movies,index) => 
                <MovieSection title={movieNameList[index]} movies={movies}/>
              )
            }
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MovieRecommendation;
