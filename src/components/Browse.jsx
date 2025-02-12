// import {store} from "../utils/store";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import Footer from "./Footer";
import ATFContainer from "./ATFContainer";
import BTFContainer from "./BTFContainer";

const Browse = () => {
  useNowPlayingMovies();
  const movieData = useSelector((store) => store.movies.nowPlayingMovies);

  if(!movieData || !movieData.length){
    // Shimmer
    return;
  }

  return (
    <div className="main flex flex-col justify-between min-h-full">
      <div className="main-inner-wra flex-1 bg-black text-white">
        <Header />
        <main>
          <ATFContainer movie={movieData[0]}/>
          <BTFContainer/>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
