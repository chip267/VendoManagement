import React, { useState } from "react";
import styles from './customers.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";
import { IMG_Logo } from "../../assets/images";
import SortLabel from "./components/sortLabel";
import { useEffect } from "react";
import { List, Pagination } from "@mui/material";
import CustomerRecord from "./components/customerRecord";
import ListWithLoading from "../GeneralComponents/ListWithLoading";
import { CircularProgress } from "@mui/material";
import CustomerApiController from "../../api/customer";
import AddCustomerForm from "./components/addCustomerForm";
import { useGlobalSnackbar } from "../Base/basePage";
import { useGlobalConfirmDialog } from "../Base/componentContext/confirmDialog";
//import images from "../../assets/images";
const testUrl = IMG_Logo;
const cx = classNames.bind(styles);
const maxItemsPerPage = 3;
const defaultPage = 1;
let totalCounts = 0;
async function initCustomers() {
  const response = await CustomerApiController.getCustomers({ page: defaultPage, limit: maxItemsPerPage });
  if (response.success) {
    let results = response.data.results;
    totalCounts = response.data.totalDocuments;
    console.log("Init customers: ", results);
    return results;
  }
  return [];
}
function Customers() {

  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [customers, setCustomers] = useState([]);
  const { showSnackbar } = useGlobalSnackbar();
  const { showDialog, hideDialog, setWaitting } = useGlobalConfirmDialog();
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const addCustomerHandler = async (customer) => {
    try {

      setIsAddingCustomer(true);
      //Check if customer has name, phoneNumber, address
      if (!customer.name || !customer.phoneNumber || !customer.address) {
        console.log("Customer has no name, phoneNumber, address");
        showSnackbar("Customer has no name, phoneNumber, address", "error");
        return;
      }
      //Check if customer has any other properties
      if (Object.keys(customer).length > 3) {
        showSnackbar("Customer has other properties", "error");
        return;
      }
      const response = await CustomerApiController.addCustomer(customer);
      if (response.success) {
        showSnackbar("Add customer successfully", "success");
        setShowAddCustomerForm(false);
        fetchCustomers(pageIndex, maxItemsPerPage);
      }
      else {
        showSnackbar("Add customer failed", "error");
      }
    }
    catch (error) {
      console.log(error);
      showSnackbar("Add customer failed", "error");
    }
    finally {
      setIsAddingCustomer(false);
    }
  }
  const fetchCustomers = async (page = defaultPage, limit = maxItemsPerPage) => {
    try {
      setIsLoading(true);
      const response = await CustomerApiController.getCustomers({ page: page + 1, limit: limit });
      if (response.success) {
        setCustomers(response.data.results);
        totalCounts = response.data.totalDocuments;
      }
      else {
        console.log("Fetch customers failed");
        showSnackbar("Fetch customers failed", "error");
      }
    }
    catch (error) {
      console.log(error);
      showSnackbar("Fetch customers failed", "error");
    }
    finally {
      setIsLoading(false);
    }

  }
  async function handleDeleteCustomer(customer) {
    await showDialog({
      header: "Delete customer",
      message: "Are you sure you want to delete this customer?",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: async () => {
        setIsDeleting(true);
        setWaitting({ isWaiting: true });
        try {
          const response = await CustomerApiController.deleteCustomer(customer._id);
          if (response.success) {
            showSnackbar("Delete customer successfully", "success");
            fetchCustomers(pageIndex, maxItemsPerPage);
          }
          else {
            showSnackbar("Delete customer failed", "error");
          }
        }
        catch (error) {
          console.log(error);
          showSnackbar("Delete customer failed", "error");
        }
        console.log("Delete customer: ", customer);
        setIsDeleting(false);
        hideDialog();

      }

    });
  }
  useEffect(() => {
    fetchCustomers(pageIndex, maxItemsPerPage);
  }, [pageIndex]);

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
          <button className={cx("btn-add")} onClick={() => setShowAddCustomerForm(!showAddCustomerForm)}>
            {showAddCustomerForm ? "Cancel" : "Add"}
          </button>
        </span>
        <span className={cx("btn-setting")}>
          <button>
            <svg className={cx("sliders-logo")} xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512">
              <path opacity="1" fill="#1E3050" d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
            </svg>
          </button>
        </span>
      </div>
      <div className={cx("lower-container")}>

        <table className={cx("table-content")} style={showAddCustomerForm ? { width: "70%" } : { width: "100%" }}>
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
                label="Phone Number"
                onClick={() => console.log("Sort by phone number")}
                sortValue="code"

              />
              <SortLabel
                label="Spent"
                onClick={() => console.log("Sort by spent")}
                sortValue="totalValueBought"

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

              <SortLabel
                label="Action"
                onClick={() => console.log("Sort by action")}
                sortValue="action"

                button="none"
              />
            </tr>
          </thead>
          <tbody>
            <ListWithLoading
              isLoading={isLoading}
              data={customers}
              renderItem={(customer, index) => (
                <CustomerRecord
                  customer={customer}
                  id={index}
                  onDelete={handleDeleteCustomer}
                />
              )}

            />
          </tbody>
        </table>

        {showAddCustomerForm && <div className={cx("add-container")}>
          {isAddingCustomer ?
            (<div className={cx("add-customer-loading")}>
              <CircularProgress />
            </div>
            ) : (
              <AddCustomerForm
                show={showAddCustomerForm}
                addCustomerHandler={addCustomerHandler}

              />
            )}
        </div>}
      </div>

      <div className={cx("pagination")} style={showAddCustomerForm ? { width: "70%" } : { width: "100%" }}>
        <Pagination
          className={cx("pagination")}
          count={Math.ceil(totalCounts / maxItemsPerPage)}
          onChange={(event, page) => setPageIndex(page - 1)}
          variant="outlined"
          shape="rounded"
          //#EBFAED
          color="primary"
        />
      </div>
    </div >);
}

export default Customers;