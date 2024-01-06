import React, { useEffect } from "react";
import styles from './sales.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";
import { IMG_Logo } from "../../assets/images";
import { Pagination } from "@mui/material";
import { useState } from "react";
import SortLabel from "./components/sortLabel";
import SaleData from "./components/saleData";
import ListWithLoading from "../GeneralComponents/ListWithLoading";
import { useGlobalSnackbar } from "../Base/basePage";
import { useGlobalConfirmDialog } from "../Base/componentContext/confirmDialog";
import { CircularProgress } from "@mui/material";
import OrderApiController from "../../api/order";
import Order from "../../models/sale";
import SaleDetail from "./components/saleDetail";
const cx = classNames.bind(styles);
let totalCount = 0;
const limitPerPage = 3;
const defaultPage = 1;
const initSales = async () => {
    const response = await OrderApiController.getOrders({ page: defaultPage + 1, limit: limitPerPage });
    if (response.success) {
        let results = response.data.results;
        const orderObjects = results.map((item) => new Order({
            ...item
        }));
        totalCount = response.data.totalDocuments;
        return orderObjects;
    }
    return [];
}
function Sales() {
    const [pageIndex, setPageIndex] = useState(0);
    //sale data api go here
    const [saleData, setSaleData] = useState(() => initSales());
    const [isFetching, setIsFetching] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedSaleDetail, setSelectedSaleDetail] = useState(null);
    const [showSaleDetail, setShowSaleDetail] = useState(false);
    const { showDialog, hideDialog } = useGlobalConfirmDialog();
    const { showSnackbar } = useGlobalSnackbar();
    useEffect(() => {
        fetchSaleData(pageIndex, limitPerPage);
        console.log("Sale data: ", saleData);
    }, [pageIndex]);
    useEffect(() => {
        console.log("Sale data: ", saleData);
        setShowSaleDetail(false);
        setSelectedSaleDetail(null);

    }, [saleData]);
    useEffect(() => {
        console.log("Selected sale detail: ", selectedSaleDetail);
        switchSaleBorder(selectedSaleDetail);
        console.log("Show sale detail: ", showSaleDetail);
    }, [selectedSaleDetail]);

    const fetchSaleData = async (pageIndex = defaultPage, maxItemPerPage = limitPerPage) => {
        setIsFetching(true);
        const response = await OrderApiController.getOrders({
            page: pageIndex + 1,
            limit: maxItemPerPage,
            sortBy: "",
        })
        if (response.success) {
            //print each sale as order class
            setSaleData(response.data.results.map((item) => new Order({ ...item })));
            totalCount = response.data.totalDocuments;
        }
        setIsFetching(false);
    }
    const onSaleClick = (sale) => {
        //Set sale detail. If is the same, then close sale detail
        //Any sale that is selected will have a border
        if (sale === selectedSaleDetail) {
            setSelectedSaleDetail(null);
            setShowSaleDetail(false);
        }
        else {
            setSelectedSaleDetail(sale);
            setShowSaleDetail(true);
        }
    }
    async function updateSelectedSale(updateInfo) {
        const filteredUpdateInfo = {};
        if (updateInfo.customerId) {
            filteredUpdateInfo.customerId = updateInfo.customerId;
        }
        if (updateInfo.status) {
            filteredUpdateInfo.status = updateInfo.status;
        }
        if (updateInfo.newOrderDetails) {
            filteredUpdateInfo.newOrderDetails = updateInfo.newOrderDetails;
        }
        if (updateInfo._id) {
            filteredUpdateInfo._id = updateInfo._id;
        }
        console.log("Update info: ", filteredUpdateInfo);

        await showDialog({
            header: "Update sale",
            message: "Are you sure you want to update this sale?",
            onConfirm: async () => {
                setIsUpdating(true);
                const response = await OrderApiController.updateOrder(updateInfo);
                if (response.success) {
                    hideDialog();
                    fetchSaleData(pageIndex, limitPerPage);
                    if (updateInfo.status !== "Cancelled")
                        showSnackbar("Sale updated successfully", "success");
                    else {
                        showSnackbar("Sale cancelled successfully", "success");
                    }
                }
                else {

                    showSnackbar("Sale updated failed", "error");
                }
                setIsUpdating(false);
            },
            onCancel: () => {
                hideDialog();
            },
            isWaitting: isUpdating,
        });


    }
    const switchSaleBorder = (sale) => {
        if (!sale) {
            //Remove all green border
            const selectedSale = document.getElementsByClassName(cx("selected-sale"));
            if (selectedSale.length > 0) {
                selectedSale[0].classList.remove(cx("selected-sale"));
            }
            return;
        }

        const id = sale._id;
        const element = document.getElementById(id);

        // Check if the sale is already selected
        const isAlreadySelected = element && element.classList.contains(cx("selected-sale"));

        // Remove previous green border
        const selectedSale = document.getElementsByClassName(cx("selected-sale"));
        if (selectedSale.length > 0) {
            selectedSale[0].classList.remove(cx("selected-sale"));
        }

        // Add or remove green border based on the selection
        if (!isAlreadySelected && element) {
            // Add green border to selected sale
            element.classList.add(cx("selected-sale"));
        }

    }
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
            <div className={cx("wrapper")}>
                <div
                    className={cx("sale-side")} style={{ width: showSaleDetail ? "60%" : "100%" }}
                >
                    <div className={cx("table-content")}>
                        <table>
                            <thead>
                                <tr className={cx("label")}>
                                    <td>
                                        <input className={cx("checkmark-header")} type="checkbox" />
                                    </td>
                                    <SortLabel label="Customer" onClick={() => { }} value="customer" />
                                    <SortLabel label="Employee" onClick={() => { }} value="orderID" />
                                    <SortLabel label="Total value" onClick={() => { }} value="saleChannel" />
                                    <SortLabel label="Date Created" onClick={() => { }} value="dateCreated" />
                                    <SortLabel label="Payment method" onClick={() => { }} value="paymentMethod" />
                                    <SortLabel label="Status" onClick={() => { }} value="status" />
                                </tr>
                            </thead>
                            {!isFetching ?
                                (<tbody>
                                    <ListWithLoading
                                        isLoading={isFetching}
                                        data={saleData}
                                        renderItem={(sale) =>
                                            <SaleData
                                                sale={sale}
                                                key={sale._id}
                                                onClick={() => onSaleClick(sale)}
                                            />

                                        }
                                    />
                                </tbody>) : (<tbody>
                                </tbody>)
                            }

                        </table>
                        <Pagination
                            className={cx("pagination")}
                            count={Math.ceil(totalCount / limitPerPage)}
                            onChange={(event, value) => { setPageIndex(value - 1); }}
                            variant="outlined"
                            shape="rounded"
                            //#EBFAED
                            color="primary"
                        />
                    </div>
                    {isFetching && <div className={cx("loading")}>
                        <CircularProgress
                            sx={{
                                color: "#2C7A51"
                            }}
                        /></div>}

                </div>
                <div className={cx("sale-detail-side")} style={{ width: showSaleDetail ? "40%" : "0%" }}>
                    {showSaleDetail && <SaleDetail
                        sale={selectedSaleDetail}
                        updateSale={updateSelectedSale}

                    />}
                </div>
            </div>

        </div>
    );
}

export default Sales;
