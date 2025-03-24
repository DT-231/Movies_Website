import Home from "../Pages/Home/Home";
import FilmDetail from "../Pages/FilmDetail/FilmDetail";
import FilmViewer from "../Pages/FilmViewer/FilmViewer";
import Products from "../Pages/Products/Products";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/home", component: Home },
    { path: "/:type/:slug", component: Products },
    { path: "/phim/:slugFilm", component: FilmDetail },
    { path: "/phim/:slugFilm/:episode/:server", component: FilmViewer },
];

export { publicRoutes };
