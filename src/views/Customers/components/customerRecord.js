
import styles from "../customers.module.scss";
import classNames from "classnames/bind";
import { IC_Delete } from "../../../assets/icons";
import { XCircle } from "lucide-react";
const cx = classNames.bind(styles);


const CustomerRecord = ({
    customer,
    id,
    onClick = null,
    onDelete = null
}) => {
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
        <tr className={cx("data")}
            key={customer._id}
            id={customer._id}
            onClick={onClick ? () => onClick(customer) : null} >
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
                <XCircle className={cx("delete-icon")} onClick={onDelete ? () => onDelete(customer) : null} />
            </td>
        </tr >
    )
}
export default CustomerRecord;