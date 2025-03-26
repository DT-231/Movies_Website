import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FullScreenButton = ({ fullScreen, onClick }) => {
    return (
        <FontAwesomeIcon
            icon={fullScreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter}
            onClick={(e) => {
                onClick();
                e.stopPropagation();
            }}
            className="cursor-pointer text-2xl"
        />
    );
};

export default FullScreenButton;
