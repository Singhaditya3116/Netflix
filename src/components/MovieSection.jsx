import { BASE_IMG_CDN_URL } from "../utils/constant";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';


const  MovieSection = ({title,movies}) => {

    return (
        <div>
            <h2 className="title text-2xl font-medium mb-4">{title}</h2>
            {/* <div className="cards-wrapper flex overflow-y-auto"> */}
            <Swiper navigation={true} loop={true} breakpoints={{
          767: {
            slidesPerView: 1,
            spaceBetween: 32,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 32,
          },
        }} modules={[Navigation]}>
                {
                    movies?.map((movie) => {
                        const {id,title,poster_path} = movie;
                        
                        return (
                            // <div className="card flex-grow flex-shrink-0 px-4" >
                            <SwiperSlide key={id} className="max-w-[200px]">
                                <img className="w-full h-full" src={BASE_IMG_CDN_URL+poster_path} alt={title} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {/* </div> */}
        </div>
    )
}

export default MovieSection;




