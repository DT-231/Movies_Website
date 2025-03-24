import { useParams } from "react-router-dom";
import PlayerControls from "../../Components/PlayerControls/PlayerControls";
import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer";
import { useEffect, useRef, useState } from "react";
import { getFilmDetail } from "../../Service/FilmService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import EpisodesSelection from "../../Common/EpisodesSelection/EpisodesSelection";
function FilmViewer() {
    const { slugFilm, episode, server } = useParams();
    const [film, setFilm] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [lastVolume, setLastVolume] = useState(0.5);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const volumeContainerRef = useRef(null);
    const startY = useRef(null);
    const [videoSrc, setVideoSrc] = useState("");
    const [ShowProcessBaar, setShowProcessBar] = useState(true);
    const timeoutRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [epsFilm, setepsFilm] = useState(null);
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

    useEffect(() => {
        const handleFullScreenChange = () => {
            setFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullScreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (volumeContainerRef.current && !volumeContainerRef.current.contains(event.target)) {
                setShowVolumeSlider(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setLoading(true);

        if (!film) return;

        let serverData = null;
        let selectedEpisodeData = null;
        // Kiểm tra server Vietsub hay Thuyet Minh (TM)
        if (server?.includes("TM")) {
            serverData = film.episodes?.[1]?.server_data;
        } else if (server?.includes("vietsub")) {
            serverData = film.episodes?.[0]?.server_data;
        }
        // tìm episode nếu ko phải phim tập sẽ lấy cái đầu tiên của sever
        if (episode !== "full") {
            selectedEpisodeData = serverData?.find((ep) => ep.slug === episode);
        } else {
            selectedEpisodeData = serverData[0];
        }
        // Set up link chiếu video
        setepsFilm(selectedEpisodeData?.name);
        if (selectedEpisodeData?.link_m3u8) {
            setVideoSrc(selectedEpisodeData.link_m3u8);
        } else {
            setVideoSrc("");
        }

        setLoading(false);
    }, [film, episode, server]);

    // Skip 10s video
    const seekForward = () => {
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currentTime + 10, "seconds");
    };

    // Go back 10 seconds
    const seekBackward = () => {
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currentTime - 10, "seconds");
    };

    const handleProgress = (state) => setPlayed(state.played);

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        setPlayed(newTime);
        playerRef.current.seekTo(newTime, "fraction");
    };

    const handleDuration = (duration) => setDuration(duration);
    // bắt đầu chỉnh thanh
    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
        e.preventDefault();
    };
    //Tăng chỉnh thanh âm lượng
    const handleTouchMove = (e) => {
        if (!startY.current) return;
        e.preventDefault();
        const deltaY = startY.current - e.touches[0].clientY;
        const newVolume = Math.min(1, Math.max(0, volume + deltaY * 0.005));
        setVolume(newVolume);
        if (!isMuted) setLastVolume(newVolume);
    };
    // kết thúc việc tăng chỉnh
    const handleTouchEnd = () => {
        startY.current = null;
    };
    // play / pause VideoVideo
    const handlePlayPause = () => setIsPlaying(!isPlaying);

    // Tắt âm lượng (click vào biểu tượng âm thanh)
    const handleMute = () => {
        if (!isMuted) {
            setLastVolume(volume);
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    //Hiên thanh chỉ âm lượng
    const toggleVolumeSlider = () => setShowVolumeSlider(!showVolumeSlider);

    // Tăng chỉnh âm lượnglượng
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (isMuted && newVolume > 0) setIsMuted(false);
        if (!isMuted) setLastVolume(newVolume);
    };

    // Event full màn hình
    const toggleFullScreen = () => {
        if (videoSrc) {
            if (!document.fullscreenElement) {
                containerRef.current.requestFullscreen();
                setFullScreen(true);
            } else {
                document.exitFullscreen();
                setFullScreen(false);
            }
        }
    };
    // Hiện thời gian phim đang chiếu
    const formatTime = (seconds) => {
        if (!seconds) return "00:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleHoverContainer = () => {
        setShowProcessBar(true);

        // Nếu có timeout trước đó, xóa nó
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Đặt lại timeout 4 giây
        timeoutRef.current = setTimeout(() => {
            setShowProcessBar(false);
        }, 4000);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null; // Xóa reference để tránh memory leak
        }
    };

    const handleOutContainer = () => {
        setShowProcessBar(false);
    };

    return (
        <div
            ref={containerRef}
            className={`bg-secondary min-h-screen flex flex-col gap-10 ${!fullScreen && "py-30 "}pb-[10px]`}
        >
            <div className="flex flex-col items-center justify-center">
                <div className={`w-full ${!fullScreen && "max-w-7xl"}`}>
                    {!fullScreen && (
                        <h4 className="text-white text-2xl font-Roboto font-bold mb-4 text-left">
                            {film?.movie?.name} {epsFilm && "-"} {epsFilm}
                        </h4>
                    )}

                    <div
                        className={`video-container cursor-pointer relative w-full`}
                        onClick={handlePlayPause}
                        onDoubleClick={toggleFullScreen}
                        onMouseOver={() => handleHoverContainer()}
                        onMouseOut={() => handleOutContainer()}
                    >
                        {loading ? (
                            <div className="p-4 text-white flex items-center justify-center gap-10 h-[500px] border-2 border-gray-700 select-none">
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-7xl" />
                                <p className="text-xl">Đang tải phim</p>
                            </div>
                        ) : videoSrc ? (
                            <VideoPlayer
                                onMouseOver={() => handleHoverContainer()} // Nhấn đúp để phóng to
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
                            <div className="p-4 text-gray-500 flex items-center justify-center gap-5 h-[500px] border-2 border-gray-700 select-none">
                                <FontAwesomeIcon icon={faTriangleExclamation} className="text-7xl" />
                                <p className="text-2xl">Phim đã bị lỗi</p>
                            </div>
                        )}

                        <PlayerControls
                            isShow={videoSrc && isPlaying ? ShowProcessBaar : true}
                            isPlaying={isPlaying}
                            onPlayPause={handlePlayPause}
                            played={played}
                            onSeek={handleSeek}
                            duration={duration}
                            formatTime={formatTime}
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
            <div className="mb-[100px]">
                {film?.episodes?.map((item, i) => (
                    <EpisodesSelection episodes={item} key={i} />
                ))}
            </div>
        </div>
    );
}

export default FilmViewer;
