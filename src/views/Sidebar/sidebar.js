import React, { useState } from "react";
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
  const [index, setIndex] = useState(0);

  const tabList = tabNames.map((tab) => {
    const key = tabNames.indexOf(tab);
    return (
      <li key={key} className="flex mt-[25px] ml-[24px]">
        <img className="w-[20px]" src={IC_Home} alt="Mô tả hình ảnh" />
        <button
          onClick={() => setIndex(tabNames.indexOf(tab))}
          className="text-[11px] font-[Lexend] font-medium text-sidebar_txt ml-[16px]"
        >
          {tab}
        </button>
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
