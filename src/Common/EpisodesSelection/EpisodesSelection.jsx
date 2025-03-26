import { useState } from "react";
import EpisodesButton from "../EpisodesButon/EpisodesButon";

function EpisodesSelection({ episodes }) {
    const [selectedServer, setSelectedServer] = useState(0); // Lưu chỉ mục máy chủ đang được chọn

    const getAudioType = (serverName) => {
        if (serverName.includes("Vietsub")) return "vietsub";
        if (serverName.includes("Thuyết Minh")) return "Thuyết minh";
        return "Unknown";
    };
    return (
        <>
            {episodes && episodes.length > 1 && (
                <div className="mt-10">
                    <h5 className="text-3xl font-Roboto font-bold text-center text-white mb-5">
                        Chọn phiên bản âm thanh
                    </h5>
                    <div className="flex justify-center gap-4 mb-10">
                        {episodes.map((server, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedServer(index)}
                                className={`px-6 py-3 rounded-lg font-bold text-lg cursor-pointer ${
                                    selectedServer === index ? "bg-hotPink text-white" : "bg-gray-700 text-gray-300"
                                }`}
                            >
                                {getAudioType(server.server_name)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Hiển thị danh sách tập phim theo server được chọn */}
            {episodes && episodes[selectedServer] && episodes[selectedServer]?.server_data.length > 0 && (
                <div>
                    <div className="text-white flex flex-col max-w-[1200px] mx-auto my-10">
                        <div>
                            <h3 className="text-3xl font-Roboto font-bold">{episodes[selectedServer].server_name}</h3>
                        </div>
                        <div className="h-auto py-3 my-5 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3 max-h-[300px] overflow-auto border-2 border-bgSearch px-5 scrollbar-thin scrollbar-thumb-subtitle scrollbar-track-bgSearch rounded-lg">
                            {episodes[selectedServer]?.server_data?.map((item, i) => (
                                <EpisodesButton
                                    data={item}
                                    key={i}
                                    server={
                                        episodes[selectedServer]?.server_name?.includes("Vietsub") ? "vietsub" : "TM"
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EpisodesSelection;
