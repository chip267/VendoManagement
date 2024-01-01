
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../products.module.scss";
import { useEffect } from "react";
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
    const [mainImage, setMainImage] = useState(null); // image[0]
    const [otherImages, setOtherImages] = useState([]); // image[1-]
    const [fileError, setFileError] = useState(false);
    const handleImageChange = ({ e, isMainImage = false }) => {
        // Other image cant be over 4. Total out at 5 including main image
        if (!isMainImage) {
            if (e.target.files.length > 4) {
                setFileError(true);
                setOtherImages([]);
                return;
            }
            else {
                setOtherImages([...e.target.files]);//[...e.target.files
                setFileError(false);
            }
        }
        else {
            if (e.target.files.length > 0) {
                setMainImage(e.target.files[0]);
            }
            else {
                setMainImage(null);
            }
        }
    };
    useEffect(() => {
        if (mainImage) {
            setImages([mainImage, ...otherImages]);
        }
        else {
            setImages([...otherImages]);
        }

    }, [mainImage, otherImages]);
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
            <div className={cx("form-line", "main-image")}>
                <label htmlFor="images">Display image:</label>
                <input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    id="images"
                    onChange={(e) => handleImageChange({ e: e, isMainImage: true })}
                />
            </div>
            <div className={cx("form-line", "images-preview")}>
                {mainImage && <div className={cx("image-preview-container")}>
                    <img src={URL.createObjectURL(mainImage)} alt="product" className={cx("image")} />
                </div>}
            </div>
            <div className={cx("form-line", "other-images")}>
                <label htmlFor="images">Other images:</label>
                <input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    multiple
                    id="images"
                    onChange={(e) => handleImageChange({ e: e, isMainImage: false })}
                />
            </div>
            <div className={cx("form-line", "images-preview-container")}>
                {otherImages.length > 0 && otherImages.map((image, index) => (
                    <div className={cx("image-preview-container")} key={index}>
                        <img src={URL.createObjectURL(image)} alt="product" className={cx("image")} />
                    </div>
                ))}
                {fileError && <div className={cx("file-error")}>You can only upload up to 4 images</div>}
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
        </div >
    );
}
export default AddProductForm;


