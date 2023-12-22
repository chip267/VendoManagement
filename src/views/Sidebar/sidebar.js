import React, { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/dashboard";
import Products from "../Products/products";
import Customers from "../Customers/customers";
import { IMG_Logo } from "../../assets/images";
import { IC_Home } from "../../assets/icons";
import Sales from "../Sales/sales";
import Message from "../Message/message";
import Settings from "../Settings/settings";
const tabNames = [
  "Dashboard",
  "Products",
  "Customers",
  "Sales",
  "Message",
  "Settings",
];

const tabs = [
  <Dashboard />,
  <Products />,
  <Customers />,
  <Sales />,
  <Message />,
  <Settings />,
];


function Sidebar() {
  const [index, SetIndex] = useState(0);
  const tabList = tabNames.map((tab) => {
    return (
      <li className="flex mt-[25px] ml-[24px]">
        <img className="w-[20px]" src={IC_Home} alt="Mô tả hình ảnh" />
        <button
          onClick={() => SetIndex(tabNames.indexOf(tab))}
          className="text-[11px] font-[Lexend] font-medium text-sidebar_txt ml-[16px]"
        >
          {tab}
        </button>
      </li>
    );
  });
  return (
    <div>
      <div>
        <div className=" w-fit">
          <img
            className=" mt-[31px] ml-[24px] w-[66px]"
            src={IMG_Logo}
            alt="Mô tả hình ảnh"
          />
          <ul className="my-10">{tabList}</ul>
        </div>
      </div>
      <div>{tabs.at(index)}</div>
    </div>
  );
}

export default Sidebar;
