import Header from "./Header";
import Footer from "./Footer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div className="main flex flex-col justify-between min-h-full">
      <div className="main-inner-wrap flex-1">
        <Header />
        <main>
          <div className="container max-w-[482px] mx-auto px-4">
            <div className="py-12 px-8 md:px-[68px] text-white bg-[rgba(0,0,0,0.7)] rounded"></div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
