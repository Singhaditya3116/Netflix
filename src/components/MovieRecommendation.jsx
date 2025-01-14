import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ACCESS_TOKEN } from "../utils/constant";
import MovieSection from "./MovieSection";
import {Search} from "../icons/index"

const MovieRecommendation = () => {
  const [query, setQuery] = useState("");
  const [movieNameList, setMovieNameList] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  async function getMovieDetails(moviesList) {
    const promiseArray = moviesList.map((movie) => fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}`, options));
    return (
      Promise.all(promiseArray)
        .then((response) => Promise.all(response.map((res) => res.json())))
        .then((jsonResponses) => jsonResponses.map((res) => res?.results))
        // .then((data) => data)
        .catch((error) => console.log("Something Went Wrong", error))
    );
  }

  useEffect(() => {
    if (movieNameList.length) {
      (async () => {
        getMovieDetails(movieNameList).then((data) => setMovieDetails(data));
      })();
    }
  }, [movieNameList]);

  const callAPI = async () => {
    const genAI = new GoogleGenerativeAI("AIzaSyA5YPhoSaQrR1sHl0UswxfqZjfSwfQwi9Q");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Give me a list of top 5 movies name list for this query:" +
      query +
      ". Give me in a comma seperated values.If an random string or you are not able to find list give me an empty response eg. ''.Example: RRR,Pushpa,Tees Maar Khan,Sherlock Homes,Veer Zaara ";

    const result = await model.generateContent(prompt);
    const data = result.response.text().split(",");

    setMovieNameList(data);
  };


  return (
    <div className="main flex flex-col justify-between h-full min-h-full">
      <div className="main-inner-wra flex-1 font-netflix text-white bg-black ">
        <Header className="" />
        <main>
          <section className="search-bar mb-8">
            <div className="max-w-[832px] px-4 mx-auto">
              <div className="flex relative">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for Movies" className=" w-full text-black bg-[#F4F4F4] flex-1 py-3 px-4 rounded-lg outline-none" />
                <button className="absolute right-0 top-0 max-w-16 p-1  w-full h-full rounded-r-lg border-l-2 border-l-black bg-[#e50914] hover:bg-[#c11119]" onClick={callAPI}>
                <Search/>
                </button>
              </div>
            </div>
          </section>

          <section className="movielist">
            <div className=" max-wl-[1312px] mx-auto px-4">
              <h1 className="title mb-4 md:mb-6 text-xl md:text-3xl font-semibold text-left md:text-center">Movie recommendation for your search result</h1>
              <div className="list-container mb-16">
                {movieDetails?.map((movies, index) => (
                  <MovieSection key={index} title={index + 1 + ". " + movieNameList[index]} movies={movies} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MovieRecommendation;
