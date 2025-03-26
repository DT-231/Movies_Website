import { useParams } from "react-router-dom";
import PlayerControls from "../../Components/PlayerControls/PlayerControls";
import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer";
import { useEffect, useRef, useState } from "react";
import { getFilmDetail } from "../../Service/FilmService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import EpisodesSelection from "../../Common/EpisodesSelection/EpisodesSelection";

// Component chính quản lý việc xem phim, hiển thị thông tin và điều khiển
function FilmViewer() {
    // Lấy các thông số từ URL (tên phim, tập và server)
    const { slugFilm, episode, server } = useParams();

    // Khai báo các state quản lý thông tin phim
    const [film, setFilm] = useState(null); // Lưu thông tin chi tiết phim
    const [isPlaying, setIsPlaying] = useState(false); // Trạng thái đang phát hay dừng
    const [isMuted, setIsMuted] = useState(false); // Trạng thái tắt tiếng
    const [volume, setVolume] = useState(0.5); // Âm lượng hiện tại (0-1)
    const [played, setPlayed] = useState(0); // Tiến độ phát (0-1)
    const [duration, setDuration] = useState(0); // Tổng thời gian của video
    const [fullScreen, setFullScreen] = useState(false); // Trạng thái toàn màn hình
    const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Hiển thị thanh điều chỉnh âm lượng

    // Các tham chiếu đến DOM elements
    const playerRef = useRef(null); // Tham chiếu đến player
    const containerRef = useRef(null); // Tham chiếu đến container
    const volumeContainerRef = useRef(null); // Tham chiếu đến container điều chỉnh âm lượng
    const startY = useRef(null); // Lưu vị trí bắt đầu khi kéo thanh âm lượng

    // State quản lý nguồn video và giao diện
    const [videoSrc, setVideoSrc] = useState(""); // Đường dẫn video
    const [ShowProcessBaar, setShowProcessBar] = useState(true); // Hiển thị thanh điều khiển
    const timeoutRef = useRef(null); // Tham chiếu đến timeout ẩn thanh điều khiển
    const [loading, setLoading] = useState(false); // Trạng thái đang tải
    const [epsFilm, setepsFilm] = useState(null); // Tên tập phim

    // Lấy thông tin chi tiết phim từ API khi slug hoặc tập thay đổi
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

    // Theo dõi sự thay đổi trạng thái toàn màn hình
    useEffect(() => {
        const handleFullScreenChange = () => {
            setFullScreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
        };

        document.addEventListener("fullscreenchange", handleFullScreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
    }, []);

    // Xử lý việc click ngoài thanh âm lượng để ẩn nó
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (volumeContainerRef.current && !volumeContainerRef.current.contains(event.target)) {
                setShowVolumeSlider(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Xử lý thay đổi phim hoặc tập, cập nhật nguồn video
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
        setepsFilm(selectedEpisodeData?.name);
        if (selectedEpisodeData?.link_m3u8) {
            setVideoSrc(selectedEpisodeData.link_m3u8);
        } else {
            setVideoSrc("");
        }

        setLoading(false);
    }, [film, episode, server]);

    // Tua nhanh video 10 giây
    const seekForward = () => {
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currentTime + 10, "seconds");
    };

    // Tua lùi video 10 giây
    const seekBackward = () => {
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currentTime - 10, "seconds");
    };

    // Theo dõi tiến độ phát video
    const handleProgress = (state) => setPlayed(state.played);

    // Xử lý khi người dùng kéo thanh tiến độ
    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        setPlayed(newTime);
        playerRef.current.seekTo(newTime, "fraction");
    };

    // Cập nhật tổng thời gian của video
    const handleDuration = (duration) => setDuration(duration);

    // Bắt đầu chỉnh thanh âm lượng trên thiết bị cảm ứng
    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
        e.preventDefault();
    };

    // Tăng giảm âm lượng khi di chuyển ngón tay
    const handleTouchMove = (e) => {
        if (!startY.current) return;
        e.preventDefault();
        const deltaY = startY.current - e.touches[0].clientY;
        const newVolume = Math.min(1, Math.max(0, volume + deltaY * 0.005));
        setVolume(newVolume);
    };

    // Kết thúc việc điều chỉnh âm lượng
    const handleTouchEnd = () => {
        startY.current = null;
    };

    // Phát hoặc tạm dừng video
    const handlePlayPause = () => setIsPlaying(!isPlaying);

    // Tắt/bật âm lượng (click vào biểu tượng âm thanh)
    const handleMute = () => {
        if (!isMuted) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    // Hiển thị/ẩn thanh điều chỉnh âm lượng
    const toggleVolumeSlider = () => setShowVolumeSlider(!showVolumeSlider);

    // Điều chỉnh âm lượng
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (isMuted && newVolume > 0) setIsMuted(false);
    };

    // Bật/tắt chế độ toàn màn hình
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            } else if (containerRef.current.webkitRequestFullScreen) {
                containerRef.current.webkitRequestFullScreen();
            } else if (containerRef.current.mozRequestFullScreen) {
                containerRef.current.mozRequestFullScreen();
            } else if (containerRef.current.msRequestFullscreen) {
                containerRef.current.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };
    // Hiện thanh điều khiển khi di chuột vào vùng video
    const handleHoverContainer = () => {
        setShowProcessBar(true);

        // Nếu có timeout trước đó, xóa nó
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Đặt lại timeout 4 giây để ẩn thanh điều khiển
        timeoutRef.current = setTimeout(() => {
            setShowProcessBar(false);
        }, 4000);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null; // Xóa reference để tránh memory leak
        }
    };

    // Ẩn thanh điều khiển khi di chuột ra khỏi vùng video
    const handleOutContainer = () => {
        setShowProcessBar(false);
    };

    return (
        <div
            ref={containerRef}
            className={`bg-secondary min-h-screen  max-w-[100vw]  flex flex-col gap-10 ${
                !fullScreen && "py-30 "
            } pb-[10px] `}
        >
            <div className="grid place-items-center w-full">
                <div className={`w-full ${!fullScreen && "max-w-7xl"} `}>
                    {/* Hiển thị tên phim và tập khi không ở chế độ toàn màn hình */}
                    {!fullScreen && (
                        <h4
                            className="text-white text-2xl font-Roboto font-bold mb-4 
                            xl:text-left 
                            max-xl:text-center 
                            max-xl:px-[10%] "
                        >
                            {film?.movie?.name}
                            {epsFilm && <span className="max-md:mt-2">- {epsFilm}</span>}
                        </h4>
                    )}

                    <div
                        className={`video-container bg-black cursor-pointer relative xl:w-full w-[80%] mx-auto`}
                        onClick={handlePlayPause}
                        onDoubleClick={toggleFullScreen}
                        onMouseOver={() => handleHoverContainer()}
                        onMouseOut={() => handleOutContainer()}
                    >
                        {/* Hiển thị trạng thái đang tải */}
                        {loading ? (
                            <div className="p-4 text-white flex items-center justify-center gap-10 h-[500px] border-2 border-gray-700 select-none">
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-7xl" />
                                <p className="text-xl">Đang tải phim</p>
                            </div>
                        ) : videoSrc ? (
                            /* Hiển thị video nếu có nguồn */
                            <VideoPlayer
                                onMouseOver={() => handleHoverContainer()}
                                onMouseOut={() => handleOutContainer()}
                                url={videoSrc}
                                playing={isPlaying}
                                volume={volume}
                                muted={isMuted}
                                onProgress={handleProgress}
                                onDuration={handleDuration}
                                playerRef={playerRef}
                                fullScreen={fullScreen}
                            />
                        ) : (
                            /* Hiển thị thông báo lỗi nếu không có nguồn */
                            <div className="p-4 text-gray-500 flex items-center justify-center gap-5 h-[500px] border-2 border-gray-700 select-none">
                                <FontAwesomeIcon icon={faTriangleExclamation} className="text-7xl" />
                                <p className="text-2xl">Phim đã bị lỗi</p>
                            </div>
                        )}

                        {/* Thanh điều khiển video - hiển thị nếu đang phát và di chuột vào, hoặc luôn hiển thị khi tạm dừng */}
                        <PlayerControls
                            isShow={videoSrc && isPlaying ? ShowProcessBaar : true}
                            isPlaying={isPlaying}
                            onPlayPause={handlePlayPause}
                            played={played}
                            onSeek={handleSeek}
                            duration={duration}
                            onBackward={seekBackward}
                            onForward={seekForward}
                            isMuted={isMuted}
                            volume={volume}
                            onMute={handleMute}
                            onVolumeChange={handleVolumeChange}
                            showVolumeSlider={showVolumeSlider}
                            toggleVolumeSlider={toggleVolumeSlider}
                            fullScreen={fullScreen}
                            onFullScreen={toggleFullScreen}
                            volumeContainerRef={volumeContainerRef}
                            onVolumeTouchStart={handleTouchStart}
                            onVolumeTouchMove={handleTouchMove}
                            onVolumeTouchEnd={handleTouchEnd}
                        />
                    </div>
                </div>
            </div>

            {/* Phần hiển thị danh sách tập phim */}
            <div className="mb-[100px] flex flex-col mx-10">
                {film?.episodes && <EpisodesSelection episodes={film.episodes} />}
            </div>
        </div>
    );
}

export default FilmViewer;
