import { Link, useParams } from "react-router-dom";

function EpisodesButton({ data, server }) {
    let { slugFilm } = useParams();
    return (
        <Link
            to={`/phim/${slugFilm}/${data.slug}/${server}`}
            className="bg-hotPink px-4 py-2 rounded-xl font-Roboto font-bold text-xs sm:text-sm md:text-lg text-white text-center flex items-center justify-center text-nowrap"
        >
            {data.name}
        </Link>
    );
}

export default EpisodesButton;
