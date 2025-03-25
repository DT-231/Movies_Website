import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark, faVolumeLow } from "@fortawesome/free-solid-svg-icons";

const VolumeControl = ({
    isMuted,
    volume,
    onMute,
    onVolumeChange,
    showVolumeSlider,
    toggleVolumeSlider,
    containerRef,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const sliderRef = useRef(null);
    const timeoutRef = useRef(null);

    const volumeIcon = isMuted ? faVolumeXmark : volume > 0.4 ? faVolumeHigh : volume > 0 ? faVolumeLow : faVolumeXmark;

    // Handle mouse enter on container
    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsHovering(true);
    };

    // Handle mouse leave from container
    const handleMouseLeave = (e) => {
        // Delay hiding to check if moving to slider
        timeoutRef.current = setTimeout(() => {
            if (!sliderRef.current?.contains(e.relatedTarget)) {
                setIsHovering(false);
            }
        }, 100);
    };

    // Handle slider mouse enter
    const handleSliderMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsHovering(true);
    };

    // Handle slider mouse leave
    const handleSliderMouseLeave = (e) => {
        if (!containerRef.current?.contains(e.relatedTarget)) {
            setIsHovering(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex items-center gap-2 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Volume icon */}
            <FontAwesomeIcon
                icon={volumeIcon}
                onClick={(e) => {
                    e.stopPropagation();
                    onMute();
                    toggleVolumeSlider();
                }}
                className="cursor-pointer text-2xl"
            />

            {/* Volume slider */}
            <div
                ref={sliderRef}
                className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 h-24 bg-black/70 p-2 rounded 
                    ${isHovering ? "block" : "hidden"}`}
                onMouseEnter={handleSliderMouseEnter}
                onMouseLeave={handleSliderMouseLeave}
            >
                <input
                    type="range"
                    min={0}
                    max={1}
                    step="0.01"
                    value={volume}
                    onChange={onVolumeChange}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onClick={(e) => e.stopPropagation()}
                    className="h-full w-[5px] cursor-pointer appearance-none"
                    style={{
                        background: `linear-gradient(to top, #FF69B4 ${volume * 100}%, #333 ${volume * 100}%)`,
                        WebkitAppearance: "slider-vertical",
                        writingMode: "bt-lr",
                        MozAppearance: "slider-vertical",
                    }}
                />
            </div>
        </div>
    );
};

export default VolumeControl;