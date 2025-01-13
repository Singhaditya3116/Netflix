import { BASE_IMG_CDN_URL } from "../utils/constant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MovieSection = ({ title, movies }) => {
  const validMovies = movies?.filter((movie) => movie?.poster_path);

  return (
    <div className="mb-4 md:mb-6 last:mb-0">
      <h2 className="ml-2 title text-xl md:text-2xl font-netflix font-medium mb-2 md:mb-4 text-white">{title}</h2>
      <Swiper
        navigation={true}
        loop={validMovies.length > 5}
        slidesPerView="auto"
        breakpoints={{
          400: {
            spaceBetween: 32,
          },
          767: {
            spaceBetween: 32,
          },
          1024: {
            spaceBetween: 32,
          },
        }}
        modules={[Navigation]}
        key={validMovies.length}
      >
        {validMovies?.map((movie) => {
          const { id, title, poster_path } = movie;
          if (!poster_path) {
            return null;
          }
          return (
            <SwiperSlide key={id} className="max-w-auto md:max-w-[250px]  hover:cursor-pointer p-2 hover:!scale-105 ease-in-out duration-300 select-none">
              <img className="w-full h-full rounded-lg object-cover" src={BASE_IMG_CDN_URL + poster_path} alt={title} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieSection;
