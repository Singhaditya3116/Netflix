// import {store} from "../utils/store";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import ATFContainer from "./ATFContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const Browse = () => {
  useNowPlayingMovies();
  const movieData = useSelector((store) => store.movies.nowPlayingMovies);

  if(!movieData || !movieData.length){
    // Shimmer
    return;
  }

  return (
    <div className="main flex flex-col justify-between min-h-full">
      <div className="main-inner-wra flex-1">
        <Header />
        <main>
          <ATFContainer movie={movieData[0]}/>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
