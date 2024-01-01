
import styles from "../customers.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const CustomerRecord = ({ customer, id }) => {
    //Number slicer to add a dot after every 3 digits from right to left
    const numberSlicer = (number) => {
        let num = number.toString();
        let result = "";
        let count = 0;
        for (let i = num.length - 1; i >= 0; i--) {
            result = num[i] + result;
            count++;
            if (count % 3 === 0 && i !== 0) {
                result = "," + result;
            }
        }
        return result;
    }
    //Determined using total value bought
    //If above 2 million, gold
    //If above 1 million, silver
    //If below 1 million, bronze
    const memershipColor = (totalValueBought) => {

        if (totalValueBought >= 2000000) {
            return "membership-gold";
        }
        else if (totalValueBought >= 1000000) {
            return "membership-silver";
        }
        else {
            return "membership-bronze";
        }
    }
    const typeOfMembership = (totalValueBought) => {
        if (totalValueBought >= 2000000) {
            return "Gold";
        }
        else if (totalValueBought >= 1000000) {
            return "Silver";
        }
        else {
            return "Bronze";
        }
    }
    return (
        <tr className={cx("data")} key={id}>
            <td><input className={cx("checkmark")} type="checkbox" /></td>
            <td className={cx("people")}>
                <div className={cx("people-de")}>{customer.name}</div>
            </td>
            <td>{customer.phoneNumber ? customer.phoneNumber : "N/A"}</td>
            <td>{customer.totalValueBought ? numberSlicer(customer.totalValueBought) + " vnd" : "N/A"}</td>
            <td className={cx("type")}>{customer.type ? customer.type : "Member"}</td>
            <td className={cx("membership")}>
                <div className={cx(memershipColor(customer.totalValueBought))}>
                    {customer.totalValueBought ? typeOfMembership(customer.totalValueBought) : "N/A"}
                </div>

            </td>

            <td>
                <div className={cx("latest-order")}>{customer.latestOrderDate ? customer.latestOrderDate : "N/A"}</div>
            </td>
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