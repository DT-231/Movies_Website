import { useState, useEffect } from 'react';
import { getFilmDetail } from '../Service/FilmService';

export const useFilmData = (slugFilm, episode, server) => {
  const [film, setFilm] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [epsFilm, setEpsFilm] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy thông tin chi tiết phim
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        let res = await getFilmDetail(slugFilm);
        setFilm(res.status ? res : null);
      } catch (error) {
        console.error("Error fetching film:", error);
        setFilm(null);
      }
    };
    fetchFilm();
  }, [slugFilm, episode]);

  // Xử lý cập nhật nguồn video
  useEffect(() => {
    setLoading(true);

    if (!film) return;

    let serverData = null;
    let selectedEpisodeData = null;

    // Kiểm tra server Vietsub hay Thuyết Minh (TM)
    if (server?.includes("TM")) {
      serverData = film.episodes?.[1]?.server_data;
    } else if (server?.includes("vietsub")) {
      serverData = film.episodes?.[0]?.server_data;
    }

    // Tìm episode nếu không phải phim lẻ sẽ lấy tập đầu tiên của server
    if (episode !== "full") {
      selectedEpisodeData = serverData?.find((ep) => ep.slug === episode);
    } else {
      selectedEpisodeData = serverData[0];
    }

    // Thiết lập link chiếu video
    setEpsFilm(selectedEpisodeData?.name);
    if (selectedEpisodeData?.link_m3u8) {
      setVideoSrc(selectedEpisodeData.link_m3u8);
    } else {
      setVideoSrc("");
    }

    setLoading(false);
  }, [film, episode, server]);

  return {
    film,
    videoSrc,
    epsFilm,
    loading
  };
};