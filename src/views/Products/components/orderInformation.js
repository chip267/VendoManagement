
import styles from "../products.module.scss";
import classNames from "classnames/bind";
import { Checkbox } from "@mui/material";
const cx = classNames.bind(styles);
//Will return the each information through the props
//Also has the function to update the quantity of the item and the total price
//As well as the tax and the subtotal and the button to pay

const OrderInformation = ({ items, taxRate, submitButton, setOrderStatus }) => {
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

                <label className={cx("delivered-checkbox")}>
                    Delivered at store :
                    <Checkbox onChange={(e) => setOrderStatus(e.target.checked ? "Delivered" : null)} />
                </label>
                {submitButton}
            </div>

        </div>

    );
}
{/* <label className={cx("discount")}>
                    Discount:
                    <label></label>
                </label>
                <label className={cx("shipping")}>
                    Shipping cost:
                    <label></label>
                </label> */}
export default OrderInformation;