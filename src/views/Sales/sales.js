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
import { IC_Print } from "../../assets/icons";
import { useUserContext } from "../../context/UserContext";
const cx = classNames.bind(styles);
const defaultPage = 0;

let totalCount = 0;
// const initSales = async () => {
//     const response = await OrderApiController.getOrders({ page: defaultPage + 1, limit: paginationLimit });
//     if (response.success) {
//         let results = response.data.results;
//         const orderObjects = results.map((item) => new Order({
//             ...item
//         }));
//         totalCount = response.data.totalDocuments;
//         return orderObjects;
//     }
//     return [];
// }

function Sales() {

    const [pageIndex, setPageIndex] = useState(0);
    //sale data api go here
    const [saleData, setSaleData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedSaleDetail, setSelectedSaleDetail] = useState(null);
    const [printMode, setPrintMode] = useState(false);
    const [showSaleDetail, setShowSaleDetail] = useState(false);
    const { showDialog, hideDialog } = useGlobalConfirmDialog();
    const { paginationLimit } = useUserContext();
    const { showSnackbar } = useGlobalSnackbar();

    useEffect(() => {
        fetchSaleData(pageIndex, paginationLimit);
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

    const fetchSaleData = async (
        pageIndex = defaultPage,
        maxItemPerPage = paginationLimit,
        customerName = null,
        employeeName = null,
        customerPhoneNumber = null,
    ) => {
        setIsFetching(true);
        const response = await OrderApiController.getOrders({
            page: pageIndex + 1,
            limit: maxItemPerPage,
            sortBy: "",
            customerName,
            employeeName,
            customerPhoneNumber
        })
        if (response.success) {
            //print each sale as order class
            setSaleData(response.data.results.map((item) => new Order({ ...item })));
            totalCount = response.data.totalFilterCount;
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
            //Null check
            if (updateInfo.newOrderDetails.length > 0 && updateInfo.newOrderDetails[0]) {
                filteredUpdateInfo.newOrderDetails = updateInfo.newOrderDetails;
                //If any of the product is null, remove it
                filteredUpdateInfo.newOrderDetails = filteredUpdateInfo.newOrderDetails.filter((item) => item !== null);
            }

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
                const response = await OrderApiController.updateOrder(filteredUpdateInfo);
                if (response.success) {
                    hideDialog();
                    fetchSaleData(pageIndex, paginationLimit);
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
    const togglePrintMode = () => {
        setPrintMode(!printMode);
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
    //Search using customer name, phone number or employee name (use E: as prefix

    const handleSaleSearch = async (event) => {
        //If has E: prefix, search by employee name

        //If not, search for customer phoneNumber if it is a number. Else, search by customer name
        const searchValue = event.target.value;
        const hasPrefix = searchValue.startsWith("E:");
        if (hasPrefix) {
            //Search by employee name
            setIsFetching(true);
            const response = await OrderApiController.getOrders({
                page: pageIndex + 1,
                limit: paginationLimit,
                employeeName: searchValue.substring(2),
            })
            if (response.success) {
                //print each sale as order class
                setSaleData(response.data.results.map((item) => new Order({ ...item })));
                totalCount = response.data.totalFilterCount;
            }
            setIsFetching(false);


        }
        else {
            setIsFetching(true);
            const isNumber = !isNaN(searchValue);
            if (isNumber) {

                const response = await OrderApiController.getOrders({
                    page: pageIndex + 1,
                    limit: paginationLimit,
                    customerPhoneNumber: searchValue,
                })
                if (response.success) {
                    //print each sale as order class
                    setSaleData(response.data.results.map((item) => new Order({ ...item })));
                    totalCount = response.data.totalFilterCount;
                }

            }
            else {
                const response = await OrderApiController.getOrders({
                    page: pageIndex + 1,
                    limit: paginationLimit,
                    customerName: searchValue,
                })
                if (response.success) {
                    //print each sale as order class
                    setSaleData(response.data.results.map((item) => new Order({ ...item })));
                    totalCount = response.data.totalFilterCount;
                }
            }
            setIsFetching(false);
        }
    }
    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <h2>Sales</h2>
            </div>
            <div className={cx("btn-bar")}>
                <span>
                    <input className={cx("search-bar")} type="text number" placeholder="Phone number, name ,..."
                        onChange={handleSaleSearch}
                    />
                </span>
                <span className={cx("btn-setting")}>
                    <button disabled={selectedSaleDetail === null} onClick={togglePrintMode}>
                        <img src={IC_Print} alt="print" />
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
                            count={Math.ceil(totalCount / paginationLimit)}
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
                        printMode={printMode}
                    />}
                </div>
            </div>

        </div>
    );
}

export default Sales;
