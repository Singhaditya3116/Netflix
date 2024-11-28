import { BASE_IMG_CDN_URL } from "../utils/constant";


const  MovieSection = ({title,movies}) => {
    return (
        <div>
            <h2 className="title text-2xl font-medium mb-4">{title}</h2>
            <div className="cards-wrapper flex overflow-y-auto">
                {
                    movies?.map((movie) => {
                        const {id,title,backdrop_path} = movie;
                        return (
                            <div className="card flex-grow flex-shrink-0 px-4" key={id}>
                                <img className="w-full h-full" src={BASE_IMG_CDN_URL+backdrop_path} alt={title} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MovieSection;




