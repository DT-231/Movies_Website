import { Link } from "react-router-dom";

function FilmCard({ item }) {
    const baseURL = "https://phimimg.com/";
    return (
        <Link to={`/phim/${item.slug}`} className="cursor-pointer block">
            <div className="relative w-full h-[250px] sm:h-[300px]">
                <div className="absolute inset-0 bg-black opacity-20 hover:opacity-0"></div>

                <img
                    src={item.poster_url.startsWith("https://") ? item.poster_url : baseURL + item.poster_url}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                />
                
                <span className="absolute top-3 left-0 px-2 py-1 font-Lora text-white bg-hotPink text-xs sm:text-sm">
                    {item.episode_current}
                </span>
            </div>
            <h5 className="font-Roboto font-bold text-white pt-2 text-sm sm:text-base truncate">{item.name}</h5>
        </Link>
    );
}

export default FilmCard;
