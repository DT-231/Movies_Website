import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SeekButtons = ({ onBackward, onForward }) => {
    return (
        <div className="flex items-center gap-3">
            <FontAwesomeIcon
                icon={faBackward}
                onClick={(e) => {
                    e.stopPropagation();
                    onBackward(); // tua nguợc video 
                }}
                className="cursor-pointer text-xl"
            />
            <FontAwesomeIcon
                icon={faForward}
                onClick={(e) => {
                    e.stopPropagation();
                    onForward();//tua nhanh video 
                }}
                className="cursor-pointer text-xl"
            />
        </div>
    );
};
export default SeekButtons;
