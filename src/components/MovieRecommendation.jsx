import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ACCESS_TOKEN } from "../utils/constant";
import MovieSection from "./MovieSection";

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
        <Header className="hidden" />
        <main>
          <section className="search-bar mb-8">
            <div className="max-w-[832px] px-4 mx-auto">
              <div className="flex relative">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for Movies" className=" w-full text-black bg-[#F4F4F4] flex-1 py-3 px-4 rounded-lg outline-none" />
                <button className="absolute right-0 top-0 max-w-16 p-1  w-full h-full rounded-r-lg border-l-2 border-l-black bg-[#e50914] hover:bg-[#c11119]" onClick={callAPI}>
                  <svg className="w-full h-full" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.4401 1.91992C7.43756 1.91992 2.56006 6.79742 2.56006 12.7999C2.56006 18.8024 7.43756 23.6799 13.4401 23.6799C15.8151 23.6799 18.0101 22.9149 19.8001 21.6199L28.2201 30.0199L30.0201 28.2199L21.7001 19.8799C23.3351 17.9749 24.3201 15.5024 24.3201 12.7999C24.3201 6.79742 19.4426 1.91992 13.4401 1.91992ZM13.4401 3.19992C18.7501 3.19992 23.0401 7.48992 23.0401 12.7999C23.0401 18.1099 18.7501 22.3999 13.4401 22.3999C8.13006 22.3999 3.84006 18.1099 3.84006 12.7999C3.84006 7.48992 8.13006 3.19992 13.4401 3.19992Z"
                      fill="#333"
                    />
                  </svg>
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
