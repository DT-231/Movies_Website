import { faSquareFacebook, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    return (
        <div className="bg-primary  ">
            <div className="max-w-[1500px] 2xl:mx-auto mx-10  py-10 flex flex-col gap-10">
                <div>
                    <h3 className="text-hotPink text-4xl font-Lora ">PinkFlix</h3>
                </div>
                <div className="flex justify-between">
                    <h6 className="text-subtitle">@2025 PinkFlix - Web xem phim miễn phí </h6>
                    <div className="text-4xl flex flex-row gap-5 text-subtitle items-center ">
                        <a href="">
                            <FontAwesomeIcon icon={faSquareFacebook} />
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={faSquareInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
