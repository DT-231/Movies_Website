import FullScreenButton from "../FullScreenButton/FullScreenButton";
import PlayPauseButton from "../../Common/PlayPauseButton/PlayPauseButton";
import ProgressBar from "../../Common/ProgressBar/ProgressBar";
import SeekButtons from "../../Common/SeekButtons/SeekButtons";
import TimeDisplay from "../../Common/TimeDisplay/TimeDisplay";
import VolumeControl from "../VolumeControl/VolumeControl";

const PlayerControls = ({
    isShow, // Trạng thái hiển thị thanh điều khiển
    isPlaying, // Trạng thái đang phát hoặc tạm dừng
    onPlayPause, // Hàm xử lý khi nhấn nút phát/tạm dừng
    played, // Thời gian đã phát của video
    onSeek, // Hàm xử lý khi người dùng kéo thanh tiến trình
    duration, // Tổng thời lượng của video
    formatTime, // Hàm định dạng thời gian
    onBackward, // Hàm xử lý tua ngược
    onForward, // Hàm xử lý tua nhanh
    isMuted, // Trạng thái tắt/bật âm thanh
    volume, // Mức âm lượng hiện tại
    onMute, // Hàm xử lý tắt/bật âm thanh
    onVolumeChange, // Hàm xử lý thay đổi âm lượng
    showVolumeSlider, // Trạng thái hiển thị thanh điều chỉnh âm lượng
    toggleVolumeSlider, // Hàm xử lý bật/tắt thanh âm lượng
    fullScreen, // Trạng thái toàn màn hình
    onFullScreen, // Hàm xử lý bật/tắt chế độ toàn màn hình
    volumeContainerRef, // Tham chiếu đến container của thanh âm lượng
    onVolumeTouchStart, // Hàm xử lý khi bắt đầu chạm vào thanh âm lượng
    onVolumeTouchMove, // Hàm xử lý khi di chuyển tay trên thanh âm lượng
    onVolumeTouchEnd, // Hàm xử lý khi kết thúc chạm vào thanh âm lượng
}) => {
    return (
        <div
            className={`absolute bottom-0 left-0 right-0 bg-black/50 p-4  text-white z-10 ${
                isShow ? "" : "opacity-0 transition "
            }`}
            onClick={(e) => e.stopPropagation()} // Ngăn chặn sự lan truyền sự kiện click
            onTouchStart={(e) => e.stopPropagation()} // Ngăn chặn sự lan truyền sự kiện chạm (bắt đầu)
            onTouchEnd={(e) => e.stopPropagation()} // Ngăn chặn sự lan truyền sự kiện chạm (kết thúc)
            onDoubleClick={(e) => e.stopPropagation()} // Ngăn chặn sự lan truyền sự kiện nhấp đúp
        >
            <div className="flex flex-row items-center">
                {/* Nút phát/tạm dừng */}
                <div className="flex items-center gap-3">
                    <PlayPauseButton isPlaying={isPlaying} onClick={onPlayPause} />
                </div>

                {/* Thanh tiến trình */}
                <div className="flex-1 mx-4">
                    <ProgressBar played={played} onChange={onSeek} />
                </div>

                <div className="flex items-center gap-3">
                    {/* Hiển thị thời gian */}
                    <TimeDisplay played={played} duration={duration} formatTime={formatTime} />

                    {/* Nút tua nhanh/tua ngược */}
                    <SeekButtons onBackward={onBackward} onForward={onForward} />

                    {/* Điều khiển âm lượng */}
                    <VolumeControl
                        isMuted={isMuted}
                        volume={volume}
                        onMute={onMute}
                        onVolumeChange={onVolumeChange}
                        showVolumeSlider={showVolumeSlider}
                        toggleVolumeSlider={toggleVolumeSlider}
                        containerRef={volumeContainerRef}
                        onTouchStart={onVolumeTouchStart}
                        onTouchMove={onVolumeTouchMove}
                        onTouchEnd={onVolumeTouchEnd}
                    />

                    {/* Nút toàn màn hình */}
                    <FullScreenButton fullScreen={fullScreen} onClick={onFullScreen} />
                </div>
            </div>
        </div>
    );
};

export default PlayerControls;
