import React, { PropsWithChildren, memo } from "react"
import { CircularProgress } from "@mui/material"

const ListWithLoading = ({
    isLoading = false,
    data = [],
    renderItem,
    emptyText,
    contentContainerClassName,
    listFooter
}) => {
    return (
        !contentContainerClassName ? <>
            {isLoading ? (
                <div className='flex justify-center items-center py-4'>
                    <CircularProgress />
                </div>
            ) : data?.length > 0 ? (
                data.map((item, index) => renderItem(item, index))
            ) : (
                <p className='text-center text-gray-400'>{emptyText || "No data"}</p>
            )}
            {listFooter}
        </>
            :
            <div className={contentContainerClassName}>
                {isLoading ? (
                    <div className='flex justify-center items-center py-4'>
                        <CircularProgress />
                    </div>
                ) : data?.length > 0 ? (
                    data.map((item, index) => renderItem(item, index))
                ) : (
                    <p className='text-center text-gray-400'>{emptyText || "No data"}</p>
                )}
                {listFooter}
            </div>
    )
}

export default ListWithLoading
