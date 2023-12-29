import styles from "../sales.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function SaleData({ sale }) {
    return (<tr className={cx("data")}>
        <td><input className={cx("checkmark")} type="checkbox" /></td>
        <td className={cx("people")}>
            <img className={cx("avatar")} src={sale.customer.avatar} alt="avatar" />
            <div className={cx("people-de")}>{sale.customer.name}</div>
        </td>
        <td>#KGA57</td>
        <td>At store</td>
        <td className={cx("date-create")}>{sale.dateCreated}</td>
        <td className={cx("payment-method")}>{sale.paymentMethod}</td>
        <td className={cx("status")}>
            <div className={cx("status-" + sale.status.toLowerCase())}>{sale.status}</div>
        </td>
        <td className={cx("detail")}>
            <button className={cx("btn-detail")}>
                <svg xmlns="http://www.w3.org/2000/svg" height="12" width="10.75" viewBox="0 0 448 512">
                    <path fill="#2c7a51" d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                </svg>
            </button>
        </td>
    </tr>);
}
export default SaleData;