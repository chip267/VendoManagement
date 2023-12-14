import React from "react";
import styles from './salesDetail.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";

const cx = classNames.bind(styles);

function SalesDetail() {
    return (
        <div className={cx("container")}>
            <div className={cx("top-content")}>
                <div className={cx("status")}>
                    <div className={cx("code")}>#S1190</div>
                    <div className={cx("status-state")}>
                        Completed
                    </div>
                </div> 
                <table className={cx("tb1")}>
                    <tr>
                        <th>Create By:</th>
                        <td className={cx("people")}>
                            <img className={cx("avatar")}></img>
                            <div className={cx("people-de")}>Nguyen Van A</div>
                        </td>
                    </tr>
                    <tr>
                        <th>Sales Channel:</th>
                        <td>At store</td>
                    </tr>
                    <tr>
                        <th>Date Created:</th>
                        <td>03 Oct, 2023 - 14:40 PM</td>
                    </tr>
                </table>
            </div>

            <div className={cx("customer-info")}>
                <div><h4>Customer Info</h4></div>
                <table className={cx("tb2")}>
                    <tr className={cx("title")}>
                        <th className={cx("tt-cus")}>Customer</th>
                        <th className={cx("tt-pay")}>Pay Method</th>
                        <th className={cx("tt-deli")}>Delivery Info</th>
                    </tr>
                    <tr className={cx("data")}>
                        <td className={cx("people2")}>
                            <img className={cx("avatar2")} src="" alt="" />
                            <div className={cx("people-de2")}>
                                <p>Nguyen Van A</p>
                                <p className={cx("phone-num")}>+84 398285020</p>
                            </div>
                        </td>
                        <td>By Cash</td>
                        <td>24A, Nguyen Du, Linh Trung, Thu Duc City</td>
                    </tr>
                </table>
            </div>

            <div className={cx("purchase-detail")}>
                <div className={cx("table-title")}>
                    <h4>Purchase Detail</h4>
                </div>

                  <table className={cx("tb3")}>
                    <thead>
                      <tr className={cx("label" )}>
                        <th className={cx("lb-product")}>Product</th>
                        <th className={cx("lb-price")}>Price</th>
                        <th className={cx("lb-quantity")}>Quantity</th>
                        <th className={cx("lb-total")}>Total</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      <tr className={cx("purchase-data")}>
                        <td className={cx("product")}>
                          <img src="" alt="" />
                          <div className={cx("product-name")}>Google Nest Mini</div>
                        </td>
                        <td className={cx("price")}>
                          <div>500.000</div>
                        </td>
                        <td className={cx("quantity")}>
                          <div>2</div>
                        </td>
                        <td className={cx("total")}>
                            1.000.000
                        </td>
                      </tr>
                    </tbody>
                    
                  </table>
            </div>

            
        </div>
    );
}

export default SalesDetail;