import { useEffect, useState } from "react";
import FilmCard from "../../Components/FilmCard/FilmCard";
import FilmSection from "../../Components/FilmSection/FilmSection"; 
import { getFilmNewUpdate, getAnime, getMovies } from "../../Service/FilmService";

function Home() {
    const [filmNewList, setFilmNewList] = useState([]); //Danh sách phim mới cập nhật  
    const [animeList, setAnimeList] = useState([]);     //Danh sách phim hoạt hình 
    const [singleMovie, setSingleMovie] = useState([]); //Danh sách phim lẻ 
    const [seriesMovie, setSeriesMovie] = useState([]); //  //Danh sách phim bộbộ

    useEffect(() => {
        // lấy danh sách phim mới cập nhật 
        const fetchFilm = async () => {
            let result = await getFilmNewUpdate(); 
            if (result.status) {
                setFilmNewList(result.items);
            }
        };
        // lấy danh sách phim hoạt hình 
        const fetchAnime = async () => {
            let result = await getAnime();
            if (result.status) {
                setAnimeList(result.data.items);
            }
        };
        // lấy danh sách phim lẻ 
        const fetchSingleMovie = async () => {
            let result = await getMovies("phim-le", 1, 12);
            if (result.status) {
                setSingleMovie(result.data.items);
            }
        };
        // lấy danh sách phim bộ 
        const fetchSeriesMovie = async () => {
            let result = await getMovies("phim-bo", 1, 12);
            if (result.status) {
                setSeriesMovie(result.data.items);
            }
        };
        fetchSingleMovie();
        fetchSeriesMovie();
        fetchAnime();
        fetchFilm();
    }, []);

    return (
        <div className="bg-secondary w-100vw h-auto py-10">
            {/* Phim mới */}
            <FilmSection title="Phim mới cập nhật" films={filmNewList} line={false} />

            {/* Phim Hoạt hình */}
            <FilmSection title="Phim Hoạt Hình" films={animeList} />

            {/* Phim Lẻ */}
            <FilmSection title="Phim Lẻ" films={singleMovie} />

            {/* Phim Bộ */}
            <FilmSection title="Phim Bộ" films={seriesMovie} />
        </div>
    );
}

export default Home;
