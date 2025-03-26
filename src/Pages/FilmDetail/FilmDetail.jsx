import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFilmDetail } from "../../Service/FilmService";
import { decodeHtmlEntities } from "../../utils/decodeHtmlEntities";
import { ExpandableText } from "../../Common/ExpandableText/ExpandableText";
import EpisodesSelection from "../../Common/EpisodesSelection/EpisodesSelection";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FilmDetail() {
    let { slugFilm } = useParams(); // Lấy tham số từ URL (slug của phim)
    const [filmDetail, setFilmDetail] = useState({}); // Lưu thông tin chi tiết của phim
    const [resultFilm, setResultFilm] = useState({}); // Lưu dữ liệu tập phim và máy chủ phát
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

    useEffect(() => {
        const fetchFilm = async () => {
            setLoading(true);
            let result = await getFilmDetail(slugFilm); // Gọi API để lấy thông tin phim

            if (result.status) {
                setFilmDetail(result.movie); // Cập nhật thông tin phim
                setResultFilm(result); // Cập nhật dữ liệu phim
            }
            setLoading(false);
        };
        fetchFilm();
    }, [slugFilm]); // Chạy lại khi slugFilm thay đổi

    // Hàm hiển thị danh sách thể loại, quốc gia dưới dạng chuỗi
    const renderTag = (items) => {
        return items?.map((item, i) => (
            <span key={i}>
                {item.name} {items.length > 0 && i !== items.length - 1 && ","}
            </span>
        ));
    };

    return (
        <div className="w-full h-auto bg-secondary py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
                {/* Hình ảnh poster của phim */}
                <div className="w-full lg:w-lg flex outline-none justify-center">
                    <img
                        src={filmDetail.poster_url}
                        loading="lazy"
                        className="w-64 lg:w-full object-contain"
                        alt={filmDetail.name}
                    />
                </div>

                {/* Nếu đang tải dữ liệu thì hiển thị spinner */}
                {loading ? (
                    <div className="w-full flex justify-center items-center py-10">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white text-3xl" />
                    </div>
                ) : (
                    <div className="text-white font-Roboto flex flex-col gap-3 bg-primary w-full p-4 rounded-2xl">
                        <h3 className="text-3xl lg:text-5xl font-bold">{filmDetail.name}</h3>
                        <h5 className="text-xl lg:text-2xl text-hotPink">Tên khác: {filmDetail.origin_name}</h5>

                        {/* Thông tin chi tiết về phim */}
                        <div className="text-base lg:text-xl flex flex-col gap-2">
                            <p>Đạo diễn: {filmDetail.director}</p>
                            <p>
                                Diễn viên:{" "}
                                {filmDetail.actor?.map((item, i) => (
                                    <span key={i}>
                                        {item}
                                        {filmDetail.actor.length > 0 && i !== filmDetail.actor.length - 1 && ", "}
                                    </span>
                                ))}
                            </p>
                            <p>Thể loại: {renderTag(filmDetail.category)}</p>
                            <p>Quốc gia: {renderTag(filmDetail.country)} </p>
                            <p>Thời lượng: {filmDetail.time}</p>
                            <p>Năm sản xuất: {filmDetail.year}</p>
                            <p>Chất lượng: {filmDetail.quality}</p>
                        </div>

                        {/* Nút xem phim và xem trailer */}
                        <div className="flex flex-row py-5 gap-10">
                            {resultFilm?.episodes && resultFilm.episodes.length > 0 && (
                                <Link
                                    to={`/phim/${slugFilm}/${
                                        resultFilm.episodes[selectedServer]?.server_data?.[0]?.slug
                                    }/${getAudioType(resultFilm.episodes[selectedServer]?.server_name || "")}`}
                                    className="text-2xl bg-hotPink font-Popin font-bold px-10 py-5 rounded-full"
                                >
                                    Xem phim
                                </Link>
                            )}
                            {filmDetail.trailer_url && (
                                <a
                                    href={`${filmDetail.trailer_url}`}
                                    className="text-2xl bg-bgSearch font-Popin font-bold px-10 py-5 rounded-full"
                                >
                                    Trailer
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Phần mô tả nội dung phim */}
            <div className="py-20">
                <div className="text-white">
                    <h5 className="text-3xl font-Roboto font-bold text-center mb-5">Nội dung phim</h5>
                    <ExpandableText text={decodeHtmlEntities(filmDetail.content)} />
                </div>

                {/*Chọn phiên bản âm thanh nếu có nhiều server và Hiển thị danh sách tập phim theo server được chọn */}
                {resultFilm?.episodes && resultFilm.episodes.length > 1 && (
                    <EpisodesSelection episodes={resultFilm.episodes} />
                )}
            </div>
        </div>
    );
}

export default FilmDetail;
