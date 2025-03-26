import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import Hls from "hls.js";

const VideoPlayer = ({
    url, // Đường dẫn đến video cần phát
    playing, // Trạng thái phát/tạm dừng video
    volume, // Mức âm lượng của video
    muted, // Trạng thái tắt/bật âm thanh
    onProgress, // Hàm xử lý tiến trình phát video
    onDuration, // Hàm xử lý khi lấy được thời lượng video
    playerRef, // Tham chiếu đến trình phát video
    fullScreen, // Trạng thái toàn màn hình
    onMouseOver, // Hàm xử lý khi di chuột vào video
    onMouseOut, // Hàm xử lý khi rời chuột khỏi video
}) => {
    const hlsRef = useRef(null); // Lưu trữ đối tượng HLS để quản lý bộ nhớ

    useEffect(() => {
        const videoElement = playerRef.current?.getInternalPlayer(); // Lấy phần tử video từ ReactPlayer
        if (!videoElement || !url) return; // Nếu không có video hoặc URL rỗng thì thoát

        if (Hls.isSupported()) {
            // Kiểm tra trình duyệt có hỗ trợ HLS không
            if (hlsRef.current) {
                hlsRef.current.destroy(); // Hủy HLS cũ nếu có
            }

            const hls = new Hls(); // Khởi tạo HLS
            hlsRef.current = hls;
            hls.loadSource(url); // Nạp nguồn video
            hls.attachMedia(videoElement); // Gắn vào trình phát
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.play(); // Tự động phát video sau khi tải xong
            });
        } else {
            console.warn("HLS không được hỗ trợ trên trình duyệt này."); // Cảnh báo nếu trình duyệt không hỗ trợ
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy(); // Hủy HLS khi component bị unmount để tránh rò rỉ bộ nhớ
            }
        };
    }, [url, playerRef]); // useEffect sẽ chạy lại khi URL hoặc playerRef thay đổi

    return (
        <ReactPlayer
            playsinline // Thêm thuộc tính này để hỗ trợ iOS
            onMouseOver={onMouseOver} // Xử lý khi di chuột vào trình phát
            onMouseOut={onMouseOut} // Xử lý khi rời chuột khỏi trình phát
            config={{
                file: {
                    forceHLS: !navigator.userAgent.includes("Safari"),
                    hlsOptions: { debug: false },
                },
            }}
            ref={playerRef} // Gán tham chiếu đến trình phát
            url={url} // Đường dẫn video
            controls={false} // Ẩn điều khiển mặc định của trình phát
            playing={playing} // Trạng thái phát/tạm dừng
            volume={volume} // Mức âm lượng
            muted={muted} // Trạng thái tắt/bật âm thanh
            onProgress={onProgress} // Gửi tiến trình phát lại
            onDuration={onDuration} // Lấy tổng thời lượng video
            width="100%" // Đảm bảo video chiếm toàn bộ chiều rộng màn hình
            height={fullScreen ? "100vh" : "56.25vw"} // Tỷ lệ 16:9 khi không ở chế độ toàn màn hình
            style={{
                maxHeight: fullScreen ? "100vh" : "70vh", // Đảm bảo không bị hở
            }}
        />
    );
};

export default VideoPlayer;
