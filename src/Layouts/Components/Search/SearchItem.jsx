import { Link } from "react-router-dom";

function SearchItem({ item }) {
    return (
        <Link className="flex  gap-3 w-full max-w-5xl h-[100px] " to={`/phim/${item.slug}`}>
            {/* Hình ảnh poster phim */}
            <div className="w-[60px] sm:w-[70px] h-auto flex-shrink-0">
                <img
                    src={`https://phimimg.com/${item.poster_url}`}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/70x100")}
                />
            </div>

            {/* Thông tin phim : Tên phim và số lượng tập */}
            <div className="flex-1 text-white font-Roboto flex flex-col text-left">
                <h5
                    className="text-[14px]  font-bold truncate  lg:max-w-50  w-full overflow-x-hidden"
                    title={item.name}
                >
                    {item.name}
                </h5>
                <p className="text-[10px] text-white/70">{item.episode_current}</p>
            </div>
        </Link>
    );
}

export default SearchItem;
