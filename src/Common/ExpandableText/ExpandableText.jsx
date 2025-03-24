import { useState } from "react";

export const ExpandableText = ({ text, maxLength = 500 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="max-w-3xl sm:max-w-6xl bg-bgSearch text-subtitle px-4 sm:px-5 py-4 sm:py-5 mx-auto rounded-2xl transition-all duration-300">
            {isExpanded ? text : text.slice(0, maxLength) + (text.length > maxLength ? "..." : "")}
            {text.length > maxLength && (
                <button
                    onClick={toggleExpand}
                    className="text-subtitle border-none cursor-pointer underline ml-2 sm:ml-3 hover:text-white transition-all duration-200"
                >
                    {isExpanded ? " [Thu gọn]" : " [Xem thêm]"}
                </button>
            )}
        </div>
    );
};
