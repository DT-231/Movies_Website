export const decodeHtmlEntities = (text) => {
    if (!text) return "";
    const entityMap = {
        "&quot;": '"',
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
    };

    return text.replace(/&quot;|&amp;|&lt;|&gt;|&#39;/g, (match) => entityMap[match]);
};
