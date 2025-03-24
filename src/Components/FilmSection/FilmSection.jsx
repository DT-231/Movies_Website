import FilmCard from "../FilmCard/FilmCard";

const FilmSection = ({ title, films, line = true, isBg = false }) => {
    return (
        <div className={`max-w-[1500px]  py-10 ${line ? "border-t-2  border-hotPink" : ""} 2xl:mx-auto mx-10`}>
            {/*  danh mục  */}
            <h4
                className={`font-Roboto  font-bold text-white mb-4 ${
                    isBg ? "  rounded-lg p-3 bg-bgSearch/50 text-2xl" : "text-3xl"
                }`}
            >
                {title}
            </h4>
            {/* Danh sách phim*/}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 pt-10 xl:grid-cols-6 gap-4 sm:gap-10">
                {films.length > 0 && films.map((item, i) => <FilmCard key={i} item={item} />)}
            </div>
        </div>
    );
};

export default FilmSection;
