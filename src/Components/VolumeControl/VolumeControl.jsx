import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark, faVolumeLow } from "@fortawesome/free-solid-svg-icons";

const VolumeControl = ({
    isMuted, // Trạng thái tắt tiếng (true: tắt tiếng, false: có âm thanh)
    volume, // Mức âm lượng (0 - 1)
    onMute, // Hàm xử lý khi bấm vào nút tắt/bật âm thanh
    onVolumeChange, // Hàm xử lý khi thay đổi âm lượng
    showVolumeSlider, // Trạng thái hiển thị thanh chỉnh âm lượng
    toggleVolumeSlider, // Hàm bật/tắt thanh chỉnh âm lượng
    containerRef, // Tham chiếu đến phần tử chứa control âm lượng
    onTouchStart, // Hàm xử lý khi bắt đầu chạm vào thanh chỉnh âm lượng
    onTouchMove, // Hàm xử lý khi kéo thanh chỉnh âm lượng
    onTouchEnd, // Hàm xử lý khi kết thúc chạm vào thanh chỉnh âm lượng
}) => {
    // Xác định biểu tượng âm lượng dựa trên mức âm lượng hiện tại
    const volumeIcon = isMuted 
        ? faVolumeXmark // Nếu tắt tiếng, hiển thị biểu tượng "tắt âm"
        : volume > 0.4 
        ? faVolumeHigh // Nếu âm lượng lớn hơn 40%, hiển thị biểu tượng "âm lượng cao"
        : volume > 0 
        ? faVolumeLow // Nếu âm lượng lớn hơn 0 nhưng nhỏ hơn 40%, hiển thị biểu tượng "âm lượng thấp"
        : faVolumeXmark; // Nếu âm lượng = 0, hiển thị biểu tượng "tắt âm"

    return (
        <div ref={containerRef} className="flex items-center gap-2 relative">
            {/* Nút điều chỉnh âm lượng */}
            <FontAwesomeIcon
                icon={volumeIcon} // Biểu tượng âm lượng tương ứng
                onClick={(e) => {
                    e.stopPropagation(); 
                    onMute(); // Gọi hàm tắt/bật âm thanh
                    toggleVolumeSlider(); // Hiển thị hoặc ẩn thanh chỉnh âm lượng
                }}
                className="cursor-pointer text-2xl"
            />
            
            {/* Thanh chỉnh âm lượng (hiển thị khi showVolumeSlider = true) */}
            <div
                className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 h-24 bg-black/70 p-2 rounded ${
                    showVolumeSlider ? "block" : "hidden"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="range" // Input dạng thanh trượt
                    min={0} // Giá trị nhỏ nhất (âm lượng tắt)
                    max={1} // Giá trị lớn nhất (âm lượng tối đa)
                    step="0.01" // Bước tăng giảm
                    value={volume} // Giá trị hiện tại
                    onChange={onVolumeChange} // Gọi hàm xử lý khi thay đổi âm lượng
                    onTouchStart={onTouchStart} // Xử lý khi bắt đầu chạm vào thanh trượt
                    onTouchMove={onTouchMove} // Xử lý khi di chuyển trên thanh trượt
                    onTouchEnd={onTouchEnd} // Xử lý khi kết thúc chạm
                    onClick={(e) => e.stopPropagation()} // Ngăn sự kiện lan truyền
                    className="h-full w-[5px] cursor-pointer appearance-none"
                    style={{
                        // Tạo hiệu ứng hiển thị mức âm lượng trên thanh trượt
                        background: `linear-gradient(to top, #FF69B4 ${volume * 100}%, #333 ${volume * 100}%)`,
                        WebkitAppearance: "slider-vertical", // Hiển thị thanh trượt theo chiều dọc trên trình duyệt WebKit
                        writingMode: "bt-lr", // Cấu hình hướng trượt (bottom-to-left-right)
                        MozAppearance: "slider-vertical", // Hiển thị thanh trượt theo chiều dọc trên trình duyệt Mozilla
                    }}
                />
            </div>
        </div>
    );
};

export default VolumeControl;
