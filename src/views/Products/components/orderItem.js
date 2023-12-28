import styles from "../products.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const OrderItem = ({ itemData, index, updateQuantity }) => {
    return (
        <div key={index} className={styles.item}>
            <input type="checkbox" className={styles.checkbox} />
            <img src={itemData.image} className={styles.image} alt="Product" />
            <div className={cx("detail")}>
                <div className={styles.name}>{itemData.name}</div>
                <div className={cx("capacity")}>{itemData.capacity}</div>
                <div className={styles.price}>{itemData.price.toLocaleString()}</div>
            </div>
            <div className={styles.quantity}>
                <button
                    className={styles.decrement}
                    onClick={() => updateQuantity(index, -1)}
                >
                    -
                </button>
                <p>{itemData.quantity}</p>
                <button
                    className={styles.increment}
                    onClick={() => updateQuantity(index, 1)}
                >
                    +
                </button>
            </div>
        </div>
    )

}
export default OrderItem;