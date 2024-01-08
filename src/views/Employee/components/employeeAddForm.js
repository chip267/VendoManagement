
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../employee.module.scss';
import { useGlobalSnackbar } from '../../Base/basePage';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import EmployeeApiController from '../../../api/employee';
const cx = classNames.bind(styles);

const EmployeeAddForm = (
    {

    }
) => {
    //No need to set account status. An associated account will be created when the employee is created.
    //Add select for position: warehouse, sale

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("0123456789");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("Avenue 1, District 1, Ho Chi Minh City")
    const [salary, setSalary] = useState(10000000);
    const [position, setPosition] = useState("sale");

    const { showSnackbar } = useGlobalSnackbar();
    const [isFormValid, setIsFormValid] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkFormValid = () => {
        //Check if any is empty
        const usernameValid = notEmptyCheck(username);
        const passwordValid = notEmptyCheck(password);
        const phoneNumberValid = notEmptyCheck(phoneNumber);
        const nameValid = notEmptyCheck(name);
        const addressValid = notEmptyCheck(address);
        const salaryValid = notEmptyCheck(salary) && isNumCheck(salary);
        const positionValid = notEmptyCheck(position);

        //In case salary is not valid
        if (!salaryValid) {
            showSnackbar("Salary must be a number", "error");
            return false;
        }

        //Check if any is invalid
        if (!usernameValid || !passwordValid || !phoneNumberValid || !nameValid || !addressValid || !salaryValid || !positionValid) {
            setIsFormValid(false);
            showSnackbar("Please fill in all fields", "error");
            return false;
        }
        setIsFormValid(true);
        return true;
    }
    const notEmptyCheck = (value) => {
        return value !== null && value !== "";
    }
    const isNumCheck = (value) => {
        return !isNaN(value);
    }

    const ErrorMessage = ({ message }) => {
        return (
            <div className="invalid-feedback">
                {message}
            </div>
        );
    }

    return (
        <div style={{ width: "100%" }}>
            <div className={cx("employee-add-form")}>
                <div className={cx("employee-add-form-header")}>
                    <h2>Add Employee</h2>
                </div>
                <div className={cx("employee-add-form-body")}>
                    <form onSubmit={async (event) => {
                        event.preventDefault();
                        setIsSubmitting(true);
                        if (checkFormValid()) {

                            const result = await EmployeeApiController.addEmployee({
                                username: username,
                                password: password,
                                phoneNumber: phoneNumber,
                                name: name,
                                address: address,
                                salary: salary,
                                position: position,
                            }
                            );
                            if (result.success) {
                                setUsername("");
                                setPassword("");
                                setPhoneNumber("");
                                setName("");
                                setAddress("");
                                setSalary("");
                                setPosition("");
                                setIsFormValid(true);
                                showSnackbar("Employee added", "success");
                                return;
                            }
                            else {
                                showSnackbar("Employee add failed", "error");
                                setIsFormValid(false);
                            }
                            if (result.data === "400") {
                                showSnackbar("Username already exists", "error");
                            }
                        }
                        else {
                            setIsFormValid(false);

                        }
                        setIsSubmitting(false);
                    }}>

                        <div className={cx("form-group")}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className={cx("form-control")}
                                id="username"
                                placeholder="Enter username"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                                disabled={isSubmitting}
                            />


                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                className={cx("form-control")}
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className={cx("form-group")}>
                            <label htmlFor="phoneNumber">Phone number</label>
                            <input
                                type="text"
                                className={cx("form-control")}
                                id="phoneNumber"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(event) => {
                                    setPhoneNumber(event.target.value);
                                }}
                                disabled={isSubmitting}
                            />

                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className={cx("form-control")}
                                id="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                                disabled={isSubmitting}
                            />

                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className={cx("form-control")}
                                id="address"
                                placeholder="Enter address"
                                value={address}
                                onChange={(event) => {
                                    setAddress(event.target.value);
                                }}
                                disabled={isSubmitting}
                            />

                        </div>

                        <div className={cx("form-group")}>
                            <label htmlFor="salary">Salary</label>
                            <input
                                type="text"
                                className={cx("form-control")}
                                id="salary"
                                placeholder="Enter salary"
                                value={salary}
                                onChange={(event) => {
                                    setSalary(event.target.value);
                                }}
                                disabled={isSubmitting}
                            />

                        </div>
                        <div className={cx("form-group-position")}>
                            <label htmlFor="position">Position</label>
                            <Select
                                id="position"
                                value={position}
                                onChange={(event) => {
                                    setPosition(event.target.value);
                                }}
                                disabled={isSubmitting}
                            >
                                <MenuItem value={"warehouse"}>Warehouse</MenuItem>
                                <MenuItem value={"sale"}>Sale</MenuItem>
                            </Select>

                        </div>
                        <div className={cx("form-group")}>
                            <button className={cx("btn-submit")}
                                type="submit" disabled={isSubmitting}>Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}
export default EmployeeAddForm;

