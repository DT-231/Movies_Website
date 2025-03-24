const TimeDisplay = ({ played, duration, formatTime }) => {
    return (
        <span className="whitespace-nowrap">
            {formatTime(played * duration)} / {formatTime(duration)}
        </span>
    );
};

export default TimeDisplay;
