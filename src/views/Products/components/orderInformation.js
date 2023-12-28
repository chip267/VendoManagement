
import styles from "../products.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
//Will return the each information through the props
//Also has the function to update the quantity of the item and the total price
//As well as the tax and the subtotal and the button to pay

const OrderInformation = ({ items, taxRate, updateInfo }) => {
    const getSubtotal = () => {
        let subtotal = 0;
        items.forEach((item) => {
            subtotal += item.price * item.quantity;
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
                <label className={cx("discount")}>
                    Discount:
                    <label></label>
                </label>
                <label className={cx("shipping")}>
                    Shipping cost:
                    <label></label>
                </label>
                <label className={cx("total")}>
                    Total:
                    <label>{getTotal().toLocaleString()}</label>
                </label>
            </div>
            <div className={cx("btn-payment")}>
                <button className={cx("btn")}>Payment</button>
            </div>
        </div>

    );
}

export default OrderInformation;