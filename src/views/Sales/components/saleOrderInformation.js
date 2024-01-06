
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../sales.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const SaleOrderInformation = ({
    order,
    taxRate,
    submitButton,
    setStatusFromParent = null,

}) => {
    const [items, setItems] = useState(order.orderDetails.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
    })));
    const [orderStatus, setOrderStatus] = useState(order.status);
    useEffect(() => {
        setOrderStatus(order.status);
        setItems(order.orderDetails.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
        })));
    }, [order]);
    useEffect(() => {
        if (setStatusFromParent) {
            setStatusFromParent(orderStatus);
        }
    }, [orderStatus]);
    const getSubtotal = () => {
        let subtotal = 0;
        items.forEach((item) => {
            subtotal += item.product.sellPrice * item.quantity;
        });
        return subtotal;
    };
    const getTax = () => {
        return getSubtotal() * taxRate;
    }
    const getTotal = () => {
        return getSubtotal() + getTax();
    }
    const onStatusChange = (event) => {
        setOrderStatus(event.target.value);
    }
    return (
        <div className={cx("customer-order")}>
            <div className={cx("summary")}>
                <label className={cx("subtotal")}>
                    Subtotal:
                    <label>{getSubtotal().toLocaleString()}</label>
                </label>
                <label className={cx("tax")}>
                    Tax:
                    <label>{getTax().toLocaleString()}</label>
                </label>

                <label className={cx("total")}>
                    Total:
                    <label>{getTotal().toLocaleString()}</label>
                </label>
                <label className={cx("status")}>
                    <label>Status:</label>
                    {order.status !== "Delivered" && order.status !== "Cancelled"
                        ? (
                            <Select
                                className={cx("status-" + orderStatus.toLowerCase())}
                                value={orderStatus}
                                onChange={onStatusChange}
                            >
                                <MenuItem
                                    value="Pending">Pending</MenuItem>
                                <MenuItem
                                    value="Delivered">Delivered</MenuItem>
                                <MenuItem
                                    value="Cancelled">Cancelled</MenuItem>
                            </Select>
                        )
                        : (
                            <>
                                {orderStatus === "Delivered" ? (
                                    <label className={cx("label-status-delivered")}>
                                        {orderStatus}
                                    </label>
                                ) : (
                                    <label className={cx("label-status-cancelled")}>
                                        {orderStatus}
                                    </label>
                                )}
                            </>
                        )}
                </label>
                {submitButton}
            </div>

        </div>

    );
}

export default SaleOrderInformation;