
//employee tab
import React, { Component, useEffect } from 'react';
import EmployeeApiController from '../../api/employee';
import { useUserContext } from '../../context/UserContext';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './employee.module.scss';
import EmployeeTableHeader from './components/tableHeader';
import Employee from '../../models/employee';
import { Pagination } from '@mui/material';
import EmployeeAddForm from './components/employeeAddForm';
import ChangePasswordDialog from './components/changePasswordDialog';
import EmployeeEditForm from './components/employeeEditForm';
import { useGlobalSnackbar } from '../Base/basePage';
import { Tooltip } from '@mui/material';
const defaultPageIndex = 0;
let totalCount = 0;
const cx = classNames.bind(styles);
//Add employee form

//Employee detail form (also is editable)

//Employee table


const EmployeeTab = () => {
    //Is showing employee detail
    const [isShowingEmployeeDetail, setIsShowingEmployeeDetail] = useState(false); //also used for edit
    const [isShowingEmployeeAddForm, setIsShowingEmployeeAddForm] = useState(false);

    const [employeeList, setEmployeeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { paginationLimit } = useUserContext();
    const [pageIndex, setPageIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [lastTypeTime, setLastTypeTime] = useState(-1);
    const [searchText, setSearchText] = useState("");
    const { showSnackbar } = useGlobalSnackbar();

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    //Init load
    useEffect(() => {
        fetchData({ limit: paginationLimit, pageIndex: pageIndex });
    }, []);
    //Fetch data when page index changes
    useEffect(() => {
        fetchData({ limit: paginationLimit, pageIndex: pageIndex });
    }, [pageIndex]);

    //Track employee list

    //Data fetcher for general use
    const fetchData = async (
        {
            limit = paginationLimit,
            pageIndex = 0,
            name = null,
            phoneNumber = null,
        }
    ) => {
        setIsLoading(true);
        const response = await EmployeeApiController.getEmployees(
            {
                limit: limit,
                page: pageIndex + 1,
                name: name,
                phoneNumber: phoneNumber
            }

        );
        if (response !== null) {
            // setEmployeeList(response.data.results.results);
            //More of a user object for each record.
            //Employee info is inside user.employeeId.*
            setEmployeeList(response.data.results.results.map((user) => {
                return new Employee(
                    {
                        employeeId: user.employeeId._id,
                        username: user.username,
                        phoneNumber: user.employeeId.phoneNumber,
                        name: user.employeeId.name,
                        address: user.employeeId.address,
                        salary: user.employeeId.salary,
                        position: user.employeeId.position,

                    }
                );
            }));


        }
        //Minus one, exclude admin
        totalCount = response.data.results.totalFilterCount - 1;
        setIsLoading(false);
    }
    //Used in both button selection. Only one will be shown at a time
    const toggleForm = (isAdd = true) => {
        //If isAdd is true, show add form, else show edit form
        //If other form is showing, hide it
        if (isAdd) {
            //Is add form showing? If not, show it
            //If yes, hide it
            //Is edit form showing? If yes, hide it then show add form
            if (isShowingEmployeeAddForm) {
                setIsShowingEmployeeAddForm(false);
            }
            else {
                setIsShowingEmployeeAddForm(true);
            }
            setIsShowingEmployeeDetail(false);
        } else {
            if (isShowingEmployeeDetail) {
                setIsShowingEmployeeDetail(false);
            }
            else {
                setIsShowingEmployeeDetail(true);
            }
            setIsShowingEmployeeAddForm(false);
        }
    }

    //use effect to search on change of search text
    useEffect(() => {
        setLastTypeTime(Date.now());
        processSearchText();
    }, [searchText]);
    const processSearchText = async () => {
        console.log("Search text changed: " + searchText);
        //If last type time is less than 500ms, do not search
        if (Date.now() - lastTypeTime < 1000) {
            return;
        }
        if (searchText === "") {
            console.log("Search text is empty");
            await fetchData({ limit: paginationLimit, pageIndex: pageIndex });
            return;
        }
        if (isNaN(searchText)) {
            //Search name
            console.log("Search name");
            await fetchData({ limit: paginationLimit, pageIndex: defaultPageIndex, name: searchText });
            return;
        }
        else {
            //Search phone number
            console.log("Search phone number");
            await fetchData({ limit: paginationLimit, pageIndex: defaultPageIndex, phoneNumber: searchText });
            return;
        }
    }
    const onEnterPress = async (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            await processSearchText();
        }
    }
    const handleSelectEmployee = (employee) => {
        //Find object with id = employeeId._id. Switch border of that object
        //If duplicate, unselect
        //If not duplicate, unselect previous, select new
        if (selectedEmployee === employee) {
            setSelectedEmployee(null);
        }
        else {
            setSelectedEmployee(employee);
        }
        switchBorderSelected(employee);
    }
    const toShorterId = (id) => {
        return id.substring(0, 5) + "...";
    }
    //Track selected employee
    // useEffect(() => {
    //     console.log("Selected employee changed: " + JSON.stringify(selectedEmployee));
    // }, [selectedEmployee]);
    const switchBorderSelected = (employee) => {
        //Find object with id = employeeId._id. Switch border of that object

        if (!employee) {
            //Remove all green border
            const selectedEmployee = document.getElementsByClassName(cx("selected-employee"));
            if (selectedEmployee.length > 0) {
                selectedEmployee[0].classList.remove(cx("selected-employee"));
            }
            return;
        }
        const id = employee.employeeId.employeeId;
        const element = document.getElementById(id);
        const isAlreadySelected = element && element.classList.contains(cx("selected-employee"));
        // Remove previous green border
        const selectedEmployee = document.getElementsByClassName(cx("selected-employee"));
        if (selectedEmployee.length > 0) {
            selectedEmployee[0].classList.remove(cx("selected-employee"));
        }
        // Add or remove green border based on the selection
        if (!isAlreadySelected && element) {
            // Add green border to selected sale
            element.classList.add(cx("selected-employee"));
        }


    }
    const handlePasswordChange = async (pw) => {
        const response = await EmployeeApiController.changePassword(selectedEmployee.employeeId.employeeId, pw);
        if (response.success) {
            showSnackbar("Password changed successfully", "success");
        }
        else {
            showSnackbar("Password changed failed", "error");
        }
        setOpenDialog(false);
    }

    const FormatPosition = (position) => {
        //If sale = "Saler"
        //If warehouse = "Warehouse staff"
        //If admin = "Administrator"
        switch (position) {
            case "sale":
                return "Saler";
            case "warehouse":
                return "Warehouse staff";
            case "admin":
                return "Administrator";
            default:
                return "Unknown";
        }
    }
    const toShortSalary = (salary) => {
        //Convert to K
        return salary / 1000;
    }
    return (
        <div className="employee-tab">
            <div className={cx("employee-header")}>
                <div className={cx("employee-header-title")}>
                    <h2>Employees</h2>
                </div>
                <div className={cx("btn-bar")}>
                    <span>
                        <input className={cx("search-bar")} type="text number" placeholder="Search name or phone number" onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={onEnterPress}
                        />
                    </span>
                    <span>
                        <button className={cx("btn-add")} onClick={() => toggleForm(true)}>Add Employee</button>
                    </span>
                    <span style={{ display: (selectedEmployee === null) ? "none" : "block" }}>
                        <button className={cx("btn-edit")} onClick={() => toggleForm(false)}>Edit</button>
                    </span>
                    {selectedEmployee !== null ?   //If selected employee is not null, show change password button
                        <>
                            <span>
                                <button className={cx("btn-change-password")} onClick={() => setOpenDialog(true)}>Change Password</button>
                            </span>
                            <span>
                                {openDialog ?
                                    <ChangePasswordDialog
                                        onClose={() => {
                                            setOpenDialog(false);
                                        }}
                                        onSubmit={(password) => {
                                            handlePasswordChange(password);
                                        }}
                                        isSubmitting={false}
                                    /> : null}
                            </span>
                        </>
                        : null}

                </div>

            </div >
            <div className={cx("content-wrapper")}>
                {isLoading ? <div className={cx("loading")}>Loading...</div> :
                    <>
                        <div className={cx("employee-table")}
                            style={{ width: (isShowingEmployeeDetail || isShowingEmployeeAddForm) ? "60%" : "100%" }}>
                            <table>
                                <EmployeeTableHeader />
                                <tbody>
                                    {employeeList.map((employee) => {

                                        return (
                                            <tr id={employee.employeeId.employeeId} key={employee.employeeId.employeeId} onClick={() => handleSelectEmployee(employee)}>
                                                <Tooltip title={employee.employeeId.employeeId}>
                                                    <td>{toShorterId(employee.employeeId.employeeId)}</td>
                                                </Tooltip>
                                                <td>{employee.employeeId.name}</td>
                                                <td>{employee.employeeId.phoneNumber}</td>
                                                <td>{FormatPosition(employee.employeeId.position)}</td>
                                                <td>{employee.employeeId.address}</td>
                                                <td>{employee.accountStatus}</td>
                                                <td>{employee.employeeId.username}</td>
                                                <td>{toShortSalary(employee.employeeId.salary)}K</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div style={{
                                display: "flex", justifyContent: "center", marginTop: "20px"
                            }}>
                                <Pagination
                                    count={Math.ceil(totalCount / paginationLimit)}
                                    onChange={(event, page) => {
                                        setPageIndex(page - 1);

                                    }}
                                    page={pageIndex + 1}
                                    variant="outlined"
                                    shape="rounded"
                                    className={cx("pagination")}
                                />
                            </div>
                        </div>
                        <div className="employee-add-form" style={{
                            display: (isShowingEmployeeAddForm) ? "" : "none",
                            width: (isShowingEmployeeAddForm) ? "40%" : "0%"
                        }}>
                            <EmployeeAddForm
                                employee={selectedEmployee}

                            />
                        </div>
                        <div className="employee-edit-form" style={{
                            display: (isShowingEmployeeDetail) ? "" : "none",
                            width: (isShowingEmployeeDetail) ? "40%" : "0%"
                        }}>
                            <EmployeeEditForm
                                selectedEmployee={selectedEmployee}

                            />
                        </div>
                    </>}

            </div>


        </div >
    );
}
export default EmployeeTab