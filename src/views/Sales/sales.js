import React, { useEffect } from "react";
import styles from './sales.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";
import { IMG_Logo } from "../../assets/images";
import { Pagination } from "@mui/material";
import { useState } from "react";
import SortLabel from "./components/sortLabel";
import SaleData from "./components/saleData";
const cx = classNames.bind(styles);
const testUrl = IMG_Logo;
const maxItemPerPage = 3;
const sampleSaleData = [
    {
        customer: {
            avatar: testUrl,
            name: "Nguyen Van A",
        },
        dateCreated: "2021-09-01",
        paymentMethod: "Cash",
        status: "Pending",
    },
    {
        customer: {
            avatar: testUrl,
            name: "Nguyen Van B",
        },
        dateCreated: "2021-09-02",
        paymentMethod: "Cash",
        status: "Completed",
    },
    {
        customer: {
            avatar: testUrl,
            name: "Nguyen Van C",
        },
        dateCreated: "2021-09-03",
        paymentMethod: "Cash",
        status: "Pending",
    },
    {
        customer: {
            avatar: testUrl,
            name: "Nguyen Van D",
        },
        dateCreated: "2021-09-04",
        paymentMethod: "Cash",
        status: "Cancelled"
    },
    {
        customer: {
            avatar: testUrl,
            name: "Nguyen Van E",
        },
        dateCreated: "2021-09-05",
        paymentMethod: "Cash",
        status: "Pending",
    },
    {
        customer: {
            avatar: testUrl,
            name: "Nguyen Van F",
        },
        dateCreated: "2021-09-06",
        paymentMethod: "Cash",
        status: "Completed",
    },
    {
        customer: {
            avatar: testUrl,
            name: "Nguyen Van G",
        },
        dateCreated: "2021-09-07",
        paymentMethod: "Cash",
        status: "Pending",
    },
];

function Sales() {
    const [pageIndex, setPageIndex] = useState(0);
    //sale data api go here
    const [saleData, setSaleData] = useState(sampleSaleData);
    const [sliceSaleData, setSliceSaleData] = useState([]);
    useEffect(() => {
        setSliceSaleData(saleData.slice(pageIndex * maxItemPerPage, pageIndex * maxItemPerPage + maxItemPerPage));
    }, [pageIndex, saleData]);
    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <h2>Sales</h2>
            </div>
            <div className={cx("btn-bar")}>
                <span>
                    <input className={cx("search-bar")} type="text number" placeholder="Search" />
                </span>
                <span className={cx("btn-setting")}>
                    <button>
                        <svg className={cx("sliders-logo")} xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512">
                            <path opacity="1" fill="#1E3050" d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
                        </svg>
                    </button>
                </span>
            </div>
            <div className={cx("table-content")}>
                <table>
                    <thead>
                        <tr className={cx("label")}>
                            <td>
                                <input className={cx("checkmark-header")} type="checkbox" />
                            </td>
                            <SortLabel label="Customer" onClick={() => { }} value="customer" />
                            <SortLabel label="Order ID" onClick={() => { }} value="orderID" />
                            <SortLabel label="Sale channel" onClick={() => { }} value="saleChannel" />
                            <SortLabel label="Date Created" onClick={() => { }} value="dateCreated" />
                            <SortLabel label="Payment method" onClick={() => { }} value="paymentMethod" />
                            <SortLabel label="Status" onClick={() => { }} value="status" />
                        </tr>
                    </thead>
                    <tbody>
                        {sliceSaleData.map((sale, index) => {
                            return <SaleData sale={sale} key={index} />;
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination
                className={cx("pagination")}
                count={Math.ceil(saleData.length / maxItemPerPage)}
                onChange={(event, value) => { setPageIndex(value - 1); }}
                variant="outlined"
                shape="rounded"
                //#EBFAED
                color="primary"
            />
        </div>
    );
}

export default Sales;
