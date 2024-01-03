
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
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                        <path opacity="1" fill="#1E3050" d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                    </svg>
                </button>
            </td>
        </tr>
    )
}
export default CustomerRecord;