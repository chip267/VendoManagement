import React, { useState } from "react";
import Dashboard from "../Dashboard/dashboard";
import Products from "../Products/products";
import Customers from "../Customers/customers";
import { IMG_Logo } from "../../assets/images";
import { IC_Home, IC_Customer, IC_Product, IC_Sales, IC_Setting } from "../../assets/icons";
import Sales from "../Sales/sales";
import Settings from "../Settings/settings";
const tabNames = [
  "Dashboard",
  "Products",
  "Customers",
  "Sales",
  "Settings",
];


const tabIcons = [
  IC_Home,
  IC_Product,
  IC_Customer,
  IC_Sales,
  IC_Setting,
];
const tabs = [
  <Dashboard />,
  <Products />,
  <Customers />,
  <Sales />,
  <Settings />,
];

function Sidebar() {
  const [index, setIndex] = useState(0);
  const styleSelected = {
    backgroundColor: "#EBFAED",
    color: "#2C7A51",
    borderRadius: "10px",
    padding: "10px",
    //
  };
  const normalStyle = {
    borderRadius: "10px",
    padding: "10px",
  }
  const iconSelected = {
    filter: "invert(40%) sepia(100%) saturate(10000%) hue-rotate(100deg) brightness(100%) contrast(100%)"
  }
  const tabList = tabNames.map((tab) => {
    const key = tabNames.indexOf(tab);
    return (
      <li key={key} className="flex mt-[25px] ml-[24px]">
        <div className="flex items-center" style={index === key ? styleSelected : normalStyle}>
          <img className="w-[20px] h-[20px] mr-[16px]" style={index === key ? iconSelected : {}}
            src={tabIcons[key]} alt="Mô tả hình ảnh" />
          <button style={index === key ? { color: "#2C7A51" } : {}}
            onClick={() => setIndex(tabNames.indexOf(tab))}
            className="text-[11px] font-[Lexend] font-medium text-sidebar_txt ml-[16px]"
          >
            {tab}
          </button>
        </div>
      </li>
    );
  });

  const contentStyleTab = {
    width: "80%",
    overflow: "hidden",
    overflowY: "scroll",
  };
  const contentStyleSideBar = {
    width: "20%",
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="side-bar" style={contentStyleSideBar}>
        <img
          className="mt-[31px] ml-[24px] w-[66px]"
          src={IMG_Logo}
          alt="Mô tả hình ảnh"
        />
        <ul className="my-10">{tabList}</ul>
      </div>
      <div className="tab-side" style={contentStyleTab}>{tabs[index]}</div>
    </div>
  );
}

export default Sidebar;
