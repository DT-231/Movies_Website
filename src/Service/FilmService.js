import request from "../Setup/axios";

const getGenre = () => {
    return request.get("the-loai");
};

const getCountry = () => {
    return request.get("quoc-gia");
};

const searchFilm = (value) => {
    return request.get(`v1/api/tim-kiem?keyword=${value}&limit=10`);
};

const getFilmDetail = (value) => {
    return request.get(`phim/${value}`);
};

const getMoviesOfGenre = (genre, page = 1, limit = 12) => {
    return request.get(`v1/api/the-loai/${genre}?page=${page}&limit=${limit}`);
};

const getMoviesOfCountry = (country, page = 1, limit = 12) => {
    return request.get(`v1/api/quoc-gia/${country}?page=${page}&limit=${limit}`);
};

const getFilmNewUpdate = (page = 1, limit = 12) => {
    return request.get(`danh-sach/phim-moi-cap-nhat-v2?page=${page}&limit=${limit}`);
};

const getAnime = (page = 1, limit = 12) => {
    return request.get(`v1/api/danh-sach/hoat-hinh?page=${page}&limit=${limit}`);
};

const getMovies = (type = "phim-le", page = 1, limit = 12) => {
    return request.get(`v1/api/danh-sach/${type}?page=${page}&limit=${limit}`);
};

export {
    getGenre,
    getMoviesOfGenre,
    getCountry,
    searchFilm,
    getFilmDetail,
    getMoviesOfCountry,
    getFilmNewUpdate,
    getAnime,
    getMovies,
};
