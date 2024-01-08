import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/dashboard";
import Products from "../Products/products";
import Customers from "../Customers/customers";
import { IMG_Logo } from "../../assets/images";
import { IC_Home, IC_Customer, IC_Product, IC_Sales, IC_Setting, IC_Employee } from "../../assets/icons";
import Sales from "../Sales/sales";
import WarehouseProducts from "../Products/productWarehouse";
import { useUserContext } from "../../context/UserContext";
import { UserApiController } from "../../api/user";
import EmployeeTab from "../Employee/employee";
import Settings from "../Settings/settings";
import ProductSaleFront from "../Products/productFront";
// const tabNames = [
//   "Dashboard",
//   "Products",
//   "Customers",
//   "Employees",
//   "Sales",
//   "Settings",
// ];



// const tabIcons = [
//   IC_Home,
//   IC_Product,
//   IC_Customer,
//   IC_Employee,
//   IC_Sales,
//   IC_Setting,
// ];
// const tabs = [
//   <Dashboard />,
//   <Products />,
//   <Customers />,
//   <EmployeeTab />,
//   <Sales />,
//   <Settings />,
// ];

const positionToMap = {
  admin: <Products />,
  warehouse: <WarehouseProducts />,
  sale: <ProductSaleFront />,
};
const saleTab = [
  <ProductSaleFront />,
  <Customers />,
  <Sales />,
  <Settings />,
];
const warehouseTab = [
  <WarehouseProducts />,
  <Settings />,
];
const adminTab = [
  <Dashboard />,
  <Products />,
  <Customers />,
  <EmployeeTab />,
  <Sales />,
  <Settings />,
];
//Admin : dashboard, products, customers, employees, sales, settings
//Warehouse: warehouse, settings
//Sale: products, customers, sales, settings
function Sidebar() {
  const [index, setIndex] = useState(0);
  const [tabs, setTabs] = useState([<Dashboard />, <Products />, <Customers />, <EmployeeTab />, <Sales />, <Settings />]);
  const [tabNames, setTabNames] = useState(["Dashboard", "Products", "Customers", "Employees", "Sales", "Settings"]);
  const [tabIcons, setTabIcons] = useState([IC_Home, IC_Product, IC_Customer, IC_Employee, IC_Sales, IC_Setting]);

  //Remove employee tab and statistic tab if user is not admin
  useEffect(() => {
    const initTabs = async () => {
      const res = await UserApiController.getCurrentUser();
      const user = res.user;
      const tabsTemp = [...tabs]
      const userPos = user.position;
      if (user.position === "admin" || user.role === "admin") {
        setTabs(adminTab);
        setTabNames(["Dashboard", "Products", "Customers", "Employees", "Sales", "Settings"]);
        setTabIcons([IC_Home, IC_Product, IC_Customer, IC_Employee, IC_Sales, IC_Setting]);
      }
      else if (user.position === "warehouse") {
        setTabs(warehouseTab);
        setTabNames(["Products", "Settings"]);
        setTabIcons([IC_Product, IC_Setting]);
      }
      else {
        setTabs(saleTab);
        setTabNames(["Products", "Customers", "Sales", "Settings"]);
        setTabIcons([IC_Product, IC_Customer, IC_Sales, IC_Setting]);
      }
    }
    initTabs();
  }, []);

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
    width: "83%",
    overflow: "hidden",
    overflowY: "scroll",
  };
  const dividerWithLineStyle = {
    width: "2%",
    height: "100vh",
    borderRight: "1.2px solid #CAE1D6",
    marginRight: "1%",
  };
  const contentStyleSideBar = {
    width: "15%",
    //Rightside line

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
      <div style={dividerWithLineStyle}></div>
      <div className="tab-side" style={contentStyleTab}>{tabs[index]}</div>
    </div>
  );
}

export default Sidebar;
