import styles from "../products.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const OrderItem = ({
    itemData,
    index,
    updateQuantity,
    preventEdit = false
}) => {
    const productData = itemData.product;
    const associatedQuantity = itemData.quantity;
    return (
        <>
            {itemData.product ? (
                <div key={productData._id}
                    className={styles.item} id={productData._id}>

                    <img src={productData.images ? productData.images[0].url : ""} alt="product" className={styles.image} />
                    <div className={cx("order-item-detail")}>
                        <div className={styles.name}>{productData.productName}</div>
                        <div className={styles.price}>{productData.sellPrice} vnd</div>
                    </div>
                    <div className={styles.quantity}>
                        {!preventEdit ? (
                            <>
                                <button
                                    className={styles.decrement}
                                    onClick={() => updateQuantity(index, -1)}
                                >
                                    -
                                </button>
                                <p>{associatedQuantity}</p>

                                <button
                                    className={styles.increment}
                                    onClick={() => updateQuantity(index, 1)}
                                >
                                    +
                                </button>
                            </>
                        ) : (
                            <p>{associatedQuantity}</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.nullItem}>
                    <p>Product not found</p>
                </div>
            )}
        </>
    )

}
export default OrderItem;