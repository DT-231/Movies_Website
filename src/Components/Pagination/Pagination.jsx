import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationRounded({ count, handleChange, currentPage }) {
    const onPageChange = (event, value) => {
        handleChange(value);
    };
    return (
        <Stack spacing={2}>
            <Pagination
                count={count}
                page={currentPage}
                onChange={onPageChange}
                color="primary"
                variant="outlined"
                shape="rounded"
                sx={{
                    "& .MuiPaginationItem-root": { color: "white", fontSize: "16px" },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "transparent",
                        color: "white",
                        fontSize: "16px",
                    },
                }}
            />
        </Stack>
    );
}

export default PaginationRounded;
