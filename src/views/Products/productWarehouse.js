import React, { useState, useEffect } from "react";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import Product from "./components/product";
import ProductApiController from "../../api/products";
import AddProductForm from "./components/addProductForm";
import DeleteProductButton from "./components/productAction/deleteProductButton";
import QuantitySelector from "./components/productAction/addDialog";
import ListWithLoading from "../GeneralComponents/ListWithLoading";
import { Pagination } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import { useGlobalSnackbar } from "../Base/basePage";
import { useGlobalConfirmDialog } from "../Base/componentContext/confirmDialog";
const defaultPage = 1;
let totalCounts = 0;
const options = [
    { value: "all", label: "All products" },
    { value: "hard-drive", label: "Hard drive" },
    { value: "ssd", label: "SSD" },
    { value: "ram", label: "Ram" },
    { value: "rom", label: "Rom" },
];
const cx = classNames.bind(styles);

const WarehouseProducts = () => {
    const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [storeProducts, setStoreProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const { paginationLimit } = useUserContext();
    const [selectedFilterOption, setSelectedFilterOption] = useState('all');
    const { showSnackbar } = useGlobalSnackbar();
    const [isDeletingProduct, setIsDeletingProduct] = useState(false);
    const [waitting, setWaitting] = useState(false);
    const { showDialog, hideDialog } = useGlobalConfirmDialog();
    useEffect(() => {
        fetchProducts(
            {
                productName: searchText,
                type: selectedFilterOption,
                page: pageIndex,
                limit: paginationLimit
            });

        console.log("Page index: ", pageIndex);
    }, [pageIndex]);

    useEffect(() => {
        console.log("Selected product: ", selectedProduct);

    }, [selectedProduct]);
    //API
    const fetchProducts = async (filter) => {
        try {
            setLoading(true);
            if (!filter) {
                filter = {};
            }

            const response = await ProductApiController.getProducts(
                {
                    page: pageIndex,
                    limit: paginationLimit,
                    productName: filter.productName ? filter.productName : null,
                    type: filter.type ? filter.type : null,
                    sellPriceFilter: filter.sellPriceFilter ? filter.sellPriceFilter : null,

                });
            console.log("Response: ", response);
            const results = response.data.results;
            console.log("Results: ", results);
            //Test convert id to object id
            totalCounts = response.data.totalFilterCount;
            setStoreProducts(results);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setSelectedProduct(null);
        fetchProducts({ productName: searchText });
    }, [searchText]);
    //On search text change
    const onSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };
    //Add a new product to DB
    const addProductHandler = async ({
        productName,
        type,
        brand,
        manufacturer,
        countryOrigin,
        sellPrice,
        importPrice,
        quantity = 0,
        images,
    }) => {
        try {
            setIsAddingProduct(true);
            //If any is null/undefined, return, except imgs
            if (!productName || !type || !brand || !manufacturer || !countryOrigin || !sellPrice || !importPrice || !quantity) {
                console.log("Missing field");
                return;
            }
            //Multipart form. Apppend each
            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("type", type);
            formData.append("brand", brand);
            formData.append("manufacturer", manufacturer);
            formData.append("countryOrigin", countryOrigin);
            formData.append("sellPrice", sellPrice);
            formData.append("importPrice", importPrice);
            formData.append("quantity", quantity);
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }
            const response = await ProductApiController.addProduct(formData);
            if (response.status === 200) {
                console.log("Add product successfully");
                showSnackbar("Add product successfully", "success");
            }
            else {
                showSnackbar("Add product failed", "error");
                console.log("Add product failed: ", response);
            }

            return response;
        } catch (error) {
            return error;
        }
        finally {
            setIsAddingProduct(false);
        }
    };
    //Delete the selected product
    const deleteProductHandler = async () => {
        console.log("Delete product: ", selectedProduct);
        showDialog({
            header: "Delete product",
            message: "Are you sure you want to delete this product?",
            onConfirm: async () => {
                setWaitting(true);
                try {
                    setIsDeletingProduct(true);
                    const response = await ProductApiController.deleteProduct(selectedProduct._id);
                    if (response.success) {
                        console.log("Delete product successfully");
                        showSnackbar("Delete product successfully", "success");
                        //Reset selected product
                        switchProductBorderColor(selectedProduct);
                        setSelectedProduct(null);
                        //Update products
                        await fetchProducts();
                        hideDialog();
                    }
                    else {
                        console.log("Delete product failed");
                        showSnackbar("Delete product failed", "error");
                        hideDialog();
                    }
                }
                catch (error) {
                    console.error("Error deleting product:", error);
                    hideDialog();
                }
                finally {
                    setIsDeletingProduct(false);

                }

            },
            onCancel: () => {
                hideDialog();
            },

        });
    };

    const onProductSelect = (product) => {
        switchProductBorderColor(product);
        setSelectedProduct((prevSelectedProduct) =>
            JSON.stringify(prevSelectedProduct) === JSON.stringify(product) ? null : product
        );
    };
    const handleOptionsChange = (option) => {
        setSelectedFilterOption(option.value);
    };
    useEffect(() => {
        fetchProducts({ type: selectedFilterOption });
        setPageIndex(1);
    }, [selectedFilterOption]);
    const switchProductBorderColor = (product) => {
        if (!product) return;

        if (selectedProduct && selectedProduct._id === product._id) {
            const element = document.getElementById(product._id);
            if (element) {
                element.style.borderColor = "";
                element.style.borderWidth = "";
            }
            return;
        }

        if (selectedProduct) {
            const element = document.getElementById(selectedProduct._id);
            if (element) {
                element.style.borderColor = "";
                element.style.borderWidth = "";
            }
        }

        const element = document.getElementById(product._id);
        if (element) {
            element.style.borderColor = "green";
            element.style.borderWidth = "thick";
        }
    };

    const addQuantityToProduct = async (quantity) => {
        if (selectedProduct) {
            try {
                const res = await ProductApiController.updateProduct({
                    _id: selectedProduct._id,
                    productAction: "add",
                    productActionQuantity: quantity
                });
                console.log("Response: ", res);
            }
            catch (error) {
                console.log("Add quantity to product failed");
                console.log("Error: ", error);
            }

        }
    }

    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <h1>Warehouse Products</h1>
            </div>
            <div className={cx("btn-bar")}>
                <span className={cx("left-side-btn-group")}>
                    <span>
                        <input className={cx("search-bar")} type="text number" placeholder="Product name" onChange={onSearchTextChange} />
                    </span>
                    <span>

                        <DeleteProductButton
                            onDelete={deleteProductHandler}
                            status={selectedProduct}
                        />
                        <button className={cx("add-quantity-button", cx({ 'disabled': !selectedProduct }))} onClick={() => setIsQuantitySelectorOpen(true)}>
                            {selectedProduct ? "Add more to product" : "Select a product"}
                        </button>
                        {isQuantitySelectorOpen && (
                            <QuantitySelector onQuantityChange={(quantity) => addQuantityToProduct(quantity)} onClose={() => setIsQuantitySelectorOpen(false)} />
                        )}
                    </span>
                </span>
            </div>
            <div className={cx("selectionBar")}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleOptionsChange(option)}
                        className={`${cx("selectionItem")} ${option.value === selectedFilterOption ? styles.selected : ""
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-left")}>
                    <div className={loading ? cx("loading") : cx("products")}>
                        <ListWithLoading
                            isLoading={loading}
                            data={storeProducts}
                            renderItem={(item, index) => <Product key={index} productData={item}
                                onClick={() => onProductSelect(item)} />}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <Pagination
                            count={Math.ceil(totalCounts / paginationLimit)}
                            page={pageIndex}
                            onChange={(event, value) => setPageIndex(value)}
                            className={styles.pagination}
                            variant="outlined"
                            shape="rounded"
                            color="primary"
                        />
                    </div>
                </div>
                <div className={cx("wrapper-right")}>
                    <div className={cx("add-product-container")}>
                        {isAddingProduct ? (
                            <div className={cx("loading")}>Loading...</div>
                        ) : (
                            <AddProductForm addProductHandler={addProductHandler} typeOptions={options} />
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WarehouseProducts;
