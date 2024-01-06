import styles from "../sales.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function SaleData(
    { sale,
        onClick
    }
) {
    function toShortDate(dateString) {
        //DD/MM/YYYY
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    //Short  id
    function toShortId(id) {
        return id.slice(0, 5);
    }
    //Add a comma to separate thousands
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function setStatusColor(status) {
        switch (status) {
            case "Pending":
                return "status-pending";
            case "Delivered":
                return "status-processing";
            case "Cancelled":
                return "status-cancelled";
            default:
                return "";
        }
    }
    return (<tr className={cx("data")} onClick={onClick} id={sale._id}>
        <td><input className={cx("checkmark")} type="checkbox" /></td>
        <td className={cx("people")}>
            {/* <img className={cx("avatar")} src={sale.customer.avatar} alt="avatar" /> */}
            {sale.customerId ? sale.customerId.name : "Unknown or deleted"}
        </td>

        <td className={cx("employee")}>
            {/* <img className={cx("avatar")} src={sale.employee.avatar} alt="avatar" /> */}
            {sale.employeeId ? sale.employeeId.name : "Unknown or deleted"}
        </td>

        <td className={cx("total")}>{formatNumber(sale.total)} đ</td>
        <td className={cx("date-create")}>{toShortDate(sale.orderDate)}</td>
        <td>At store</td>
        <td className={cx("status")}>
            <div className={cx("status-" + sale.status.toLowerCase())}>{sale.status}</div>
        </td>
    </tr>);
}
export default SaleData;