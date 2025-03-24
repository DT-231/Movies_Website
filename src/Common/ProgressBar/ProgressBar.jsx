const ProgressBar = ({ played, onChange }) => {
    return (
        <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={played}
            onChange={onChange}
            onMouseDown={(e) => e.stopPropagation()} // Ngăn sự kiện click lan truyền
            onTouchStart={(e) => e.stopPropagation()} // Ngăn sự kiện trên thiết bị cảm
            className="w-full h-[5px] rounded-md cursor-pointer appearance-none"
            style={{
                background: `linear-gradient(90deg, #FF69B4 ${played * 100}%, #ddd ${played * 100}%)`,
            }}
        />
    );
};

export default ProgressBar;
