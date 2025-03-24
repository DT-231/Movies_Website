import { useEffect, useState, useCallback } from "react";
import { getMovies, getMoviesOfCountry, getMoviesOfGenre } from "../../Service/FilmService";
import { useParams } from "react-router-dom";
import FilmSection from "../../Components/FilmSection/FilmSection";
import PaginationRounded from "../../Components/Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Trang danh sách phim theo thể loại, quốc gia, danh mục
function Products() {
    const { type, slug } = useParams(); // Lấy tham số từ URL type để phân biệt trang thể loại / quốc gia / danh mục (phim lẻ , phim bộ)/ phim hoạt hình
    const [title, setTitle] = useState(null); // Tiêu đề trang
    const [listFilm, setListFilm] = useState([]); // Danh sách phim
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [limit] = useState(36); // Giới hạn số phim trên mỗi trang
    const [totalPage, setTotalPage] = useState(0); // Tổng số trang
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

    // Hàm lấy dữ liệu phim dựa vào loại phim (quốc gia, thể loại, danh mục)
    const fetchData = useCallback(async () => {
        setLoading(true); // Bắt đầu tải dữ liệu
        let res = null;
        let titleType = "";

        try {
            if (type === "quoc-gia") {
                res = await getMoviesOfCountry(slug, currentPage, limit);
                titleType = "Quốc Gia";
            } else if (type === "the-loai") {
                res = await getMoviesOfGenre(slug, currentPage, limit);
                titleType = "Thể Loại";
            } else if (type === "danh-muc") {
                res = await getMovies(slug, currentPage, limit);
                titleType = "Danh Mục";
            }

            if (res?.status) {
                setListFilm(res.data.items); // Lưu danh sách phim vào state
                setTitle(`${titleType} > ${res.data.titlePage || "Không tìm thấy"}`); // Cập nhật tiêu đề trang
                setTotalPage(res.data.params.pagination.totalPages); // Cập nhật tổng số trang
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu phim:", error); // Hiển thị lỗi nếu có
        }
        setLoading(false); // Kết thúc tải dữ liệu
    }, [type, slug, currentPage, limit]);

    // Gọi hàm fetchData mỗi khi type, slug hoặc currentPage thay đổi
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="bg-secondary py-10">
            {loading ? (
                // Hiển thị hiệu ứng loading khi đang tải dữ liệu
                <div className="w-full flex justify-center py-10">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white text-3xl" />
                </div>
            ) : (
                // Hiển thị danh sách phim sau khi tải xong
                <FilmSection title={title} films={listFilm} line={false} isBg={true} />
            )}

            {/* Hiển thị phân trang nếu có nhiều hơn 1 trang */}
            {totalPage > 1 && (
                <div className="flex justify-center">
                    <PaginationRounded count={totalPage} handleChange={setCurrentPage} />
                </div>
            )}
        </div>
    );
}

export default Products;
