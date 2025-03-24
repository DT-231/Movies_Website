import { useState } from "react";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
function DropDownItem({ ItemList = [], title, row = 4, type }) {
    const [visible, setVisible] = useState(false);
    const GridRow = {
        4: "md:grid-rows-4",
        6: "md:grid-rows-6",
    };

    return (
        <Tippy
            content={
                <div
                    className={`grid gap-2 md:grid-flow-col ${GridRow[row]}  grid-cols-1 shadow-lg rounded-lg p-2 
                               w-max min-w-[150px] max-w-[700px] max-h-[300px] 
                               overflow-y-auto`}
                >
                    {ItemList.length > 0 &&
                        ItemList.map((item, index) => (
                            <Link
                                key={index}
                                className="p-2 cursor-pointer whitespace-nowrap hover:bg-gray-900 text-center"
                                to={`/${type}/${item.slug}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                </div>
            }
            delay={[100, 200]}
            interactive={true}
            placement="bottom"
            theme="translucent"
            maxWidth={1000}
        >
            <div className="relative cursor-pointer" onClick={() => setVisible(!visible)}>
                <span className="">{title}</span>
            </div>
        </Tippy>
    );
}

export default DropDownItem;
