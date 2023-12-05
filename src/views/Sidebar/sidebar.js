import React, { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/dashboard";
import Products from "../Products/products";
import Customers from "../Customers/customers";
const tabNames = ["Dashboard", "Products", "Customers"];

const tabs = [<Dashboard />, <Products />, <Customers />];

function Sidebar() {
  const [index, SetIndex] = useState(0);
  const tabList = tabNames.map((tab) => {
    return (
      <li>
        <button onClick={() => SetIndex(tabNames.indexOf(tab))}>{tab}</button>
      </li>
    );
  });
  return (
    <div>
      <div>
        <div className=" w-fit">
          <p>Hello, Thanh Hien</p>
          <p>See your account</p>
          <ul className="my-10">{tabList}</ul>
        </div>
      </div>
      <div>{tabs.at(index)}</div>
    </div>
  );
}

export default Sidebar;
