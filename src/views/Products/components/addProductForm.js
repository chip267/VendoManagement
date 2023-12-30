
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../products.module.scss";
const cx = classNames.bind(styles);
const AddProductForm = ({ addProductHandler, key, addtionalContainerClassName }) => {
    // Info include: productName, type, brand, manufacturer, countryOrigin, sellPrice, importPrice, quantity, images
    const [productName, setProductName] = useState("");
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [countryOrigin, setCountryOrigin] = useState("");
    const [sellPrice, setSellPrice] = useState(0);
    const [importPrice, setImportPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [images, setImages] = useState([]);

    return (
        <div className={cx("add-product-form") + " " + addtionalContainerClassName} key={key}>
            <div className={cx("add-product-title-container")}>
                <h2 className={cx("add-product-title")}>
                    Add product</h2>

                <div className={cx("add-product-title-underline")}></div>
            </div>
            <div className={cx("form-line")}>
                <label htmlFor="product-name">Product name</label>
                <input type="text" id="product-name" onChange={(e) => setProductName(e.target.value)} />

            </div>
            <div className={cx("form-line")}>
                <label htmlFor="type">Type</label>
                <input type="text" id="type" onChange={(e) => setType(e.target.value)} />
            </div>
            <div className={cx("form-line")}>
                <label htmlFor="brand">Brand</label>
                <input type="text" id="brand" onChange={(e) => setBrand(e.target.value)} />

            </div>
            <div className={cx("form-line")}>
                <label htmlFor="manufacturer">Manufacturer</label>
                <input type="text" id="manufacturer" onChange={(e) => setManufacturer(e.target.value)} />
            </div>
            <div className={cx("form-line")}>
                <label htmlFor="country-origin">Country origin</label>
                <input type="text" id="country-origin" onChange={(e) => setCountryOrigin(e.target.value)} />
            </div>
            <div className={cx("form-line")}>
                <label htmlFor="sell-price">Sell price</label>
                <input type="number" id="sell-price" onChange={(e) => setSellPrice(e.target.value)} />
            </div>
            <div className={cx("form-line")}>
                <label htmlFor="import-price">Import price</label>
                <input type="number" id="import-price" onChange={(e) => setImportPrice(e.target.value)} />
            </div>
            <div className={cx("form-line")}>
                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className={cx("form-line", "images")}>
                <label htmlFor="images">Images</label>
                <input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    id="images"
                    onChange={(e) => setImages(e.target.files)} />
            </div>
            <button className={cx("add-product-button")} onClick={() => addProductHandler({
                productName,
                type,
                brand,
                manufacturer,
                countryOrigin,
                sellPrice,
                importPrice,
                quantity,
                images
            })}>
                Add product
            </button>
        </div>
    );
}
export default AddProductForm;


