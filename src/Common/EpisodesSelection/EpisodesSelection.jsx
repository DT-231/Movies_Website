import EpisodesButton from "../EpisodesButon/EpisodesButon";

function EpisodesSelection({ episodes }) {
    return (
        <div className="text-white flex flex-col max-w-[1200px] mx-auto my-10">
            <div>
                <h3 className="text-3xl font-Roboto font-bold">{episodes.server_name}</h3>
            </div>
            <div className="h-auto py-3 my-5 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3 max-h-[300px] overflow-auto border-2 border-bgSearch px-5 scrollbar-thin scrollbar-thumb-subtitle scrollbar-track-bgSearch rounded-lg">
                {episodes?.server_data?.map((item, i) => (
                    <EpisodesButton
                        data={item}
                        key={i}
                        server={episodes?.server_name?.includes("Vietsub") ? "vietsub" : "TM"}
                    />
                ))}
            </div>
        </div>
    );
}

export default EpisodesSelection;
