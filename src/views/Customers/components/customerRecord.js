
import styles from "../customers.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const CustomerRecord = ({ customer, id }) => {
    return (
        <tr className={cx("data")} key={id}>
            <td><input className={cx("checkmark")} type="checkbox" /></td>
            <td className={cx("people")}>
                <img className={cx("avatar")} src={customer.avatar} alt="Mô tả hình ảnh" />
                <div className={cx("people-de")}>{customer.name}</div>
            </td>
            <td>{customer.code}</td>
            <td>{customer.bought}</td>
            <td className={cx("type")}>{customer.type}</td>
            <td className={cx("membership-gold")}>
                <div className={cx("mem-gold")}>{customer.membership}</div>
            </td>

            <td>Oct 03, 2021</td>
            <td className={cx("delete")}>
                <button className={cx("btn-delete")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 384 512">
                        <path opacity="1" fill="#1E3050" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}
export default CustomerRecord;