import React, { useState } from "react";
import styles from './customers.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";
import { IMG_Logo } from "../../assets/images";
import SortLabel from "./components/sortLabel";
import { useEffect } from "react";
import { Pagination } from "@mui/material";

import CustomerRecord from "./components/customerRecord";
//import images from "../../assets/images";
const testUrl = IMG_Logo;
const cx = classNames.bind(styles);
const maxItemsPerPage = 3
function Customers() {
  const [pageIndex, setPageIndex] = useState(0);
  const [slicedCustomers, setSlicedCustomers] = useState([]);
  //API data here
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Nguyen Van A",
      code: "#KGA57",
      bought: 67,
      type: "Member",
      membership: "Gold",
      latestOrder: "Oct 03, 2021",
    },
    {
      id: 2,
      name: "Nguyen Van B",
      code: "#KGA57",
      bought: 67,
      type: "Member",
      membership: "Gold",
      latestOrder: "Oct 03, 2021",
    },
    {
      id: 3,
      name: "Nguyen Van C",
      code: "#KGA57",
      bought: 67,
      type: "Member",
      membership: "Gold",
      latestOrder: "Oct 03, 2021",
    },
    {
      id: 3,
      name: "Nguyen Van C",
      code: "#KGA57",
      bought: 67,
      type: "Member",
      membership: "Gold",
      latestOrder: "Oct 03, 2021",
    },
  ]);
  const onPageChange = (page) => {
    setPageIndex(page - 1);
  };
  useEffect(() => {
    const start = pageIndex * maxItemsPerPage;
    const end = start + maxItemsPerPage;
    setSlicedCustomers(customers.slice(start, end));
    console.log("Slice customers: ", slicedCustomers);
    console.log("Page: ", pageIndex);
  }, [pageIndex, customers]);
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2>Customer</h2>
      </div>
      <div className={cx("mini-home-logo")}>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
            <path opacity="1" fill="#2C7A51" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
          </svg>
        </button>
      </div>
      <div className={cx("btn-bar")}>
        <span>
          <input className={cx("search-bar")} type="text number" placeholder="Search" />
        </span>
        <span>
          <button className={cx("btn-add")}>+ Add Customer</button>
        </span>
        <span className={cx("btn-setting")}>
          <button>
            <svg className={cx("sliders-logo")} xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512">
              <path opacity="1" fill="#1E3050" d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
            </svg>
          </button>
        </span>
      </div>
      <div className={cx("table-content")}>
        <table>
          <thead>
            <tr className={cx("label")}>
              <td>
                <input className={cx("checkmark-title")} type="checkbox" />
              </td>
              <SortLabel
                label="Name"
                onClick={() => console.log("Sort by name")}
                sortValue="name"
              />
              <SortLabel
                label="Customer Code"
                onClick={() => console.log("Sort by customer code")}
                sortValue="code"
              />
              <SortLabel
                label="Bought"
                onClick={() => console.log("Sort by bought")}
                sortValue="bought"
              />
              <SortLabel
                label="Type"
                onClick={() => console.log("Sort by type")}
                sortValue="type"
              />

              <SortLabel
                label="Membership"
                onClick={() => console.log("Sort by membership")}
                sortValue="membership"
              />
              <SortLabel
                label="Latest Order"
                onClick={() => console.log("Sort by latest order")}
                sortValue="latestOrder"
              />
            </tr>
          </thead>
          <tbody>
            {slicedCustomers.map((customer) => (
              customer.avatar = testUrl,
              <CustomerRecord
                key={customer.id}
                customer={customer}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        className={cx("pagination")}
        count={Math.ceil(customers.length / maxItemsPerPage)}
        onChange={(event, page) => onPageChange(page)}
        variant="outlined"
        shape="rounded"
        //#EBFAED
        color="primary"
      />
    </div>
  );
}

export default Customers;