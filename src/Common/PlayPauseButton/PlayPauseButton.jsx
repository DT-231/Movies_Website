import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayPauseButton = ({ isPlaying, onClick }) => {
    return (
        <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            onClick={(e) => {
                e.stopPropagation(); // Ngăn sự kiện lan truyền lên container
                onClick();
            }}
            className="cursor-pointer text-2xl"
        />
    );
};

export default PlayPauseButton;
