
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import styles from '../employee.module.scss';
import Employee from '../../../models/employee';
import { useGlobalSnackbar } from '../../Base/basePage';
import { useEffect } from 'react';
import EmployeeApiController from '../../../api/employee';
const cx = classNames.bind(styles);

//Editable value : name , salary, position, address, phone number.
//Pass in a current selected employee and use it to set the default value for the form

const EmployeeEditForm = (
    {
        selectedEmployee = null,
        additionalOnSubmit = null
    }
) => {
    //No need to set account status. An associated account will be created when the employee is created.
    //Add select for position: warehouse, sale
    const [phoneNumber, setPhoneNumber] = useState(selectedEmployee ? selectedEmployee.phoneNumber : "");
    const [name, setName] = useState(selectedEmployee ? selectedEmployee.employeeId.name : "");
    const [address, setAddress] = useState(selectedEmployee ? selectedEmployee.address : "");
    const [salary, setSalary] = useState(selectedEmployee ? selectedEmployee.employeeId.salary : "");
    const [position, setPosition] = useState(selectedEmployee ? selectedEmployee.employeeId.position : "");

    const [isFormValid, setIsFormValid] = useState(true);
    const { showSnackbar } = useGlobalSnackbar();
    const [isSubmitting, setIsSubmitting] = useState(false);



    //Rerender on selected employee change
    useEffect(() => {
        setPhoneNumber(selectedEmployee ? selectedEmployee.employeeId.phoneNumber : "");
        setName(selectedEmployee ? selectedEmployee.employeeId.name : "");
        setAddress(selectedEmployee ? selectedEmployee.employeeId.address : "");
        setSalary(selectedEmployee ? selectedEmployee.employeeId.salary : "");
        setPosition(selectedEmployee ? selectedEmployee.employeeId.position : "");
        console.log("Selected employee in edit: " + JSON.stringify(selectedEmployee));
    }, [selectedEmployee]);

    const checkFormValid = () => {
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
        if (!phoneNumberValid || !nameValid || !addressValid || !salaryValid || !positionValid) {
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
    return (
        <div className={cx("employee-edit-form")}>
            <div className={cx("employee-edit-form-header")}>
                <h2>Edit Employee</h2>
            </div>
            <div className={cx("employee-edit-form-body")}>
                <form onSubmit={async (event) => {
                    event.preventDefault();
                    setIsSubmitting(true);
                    if (checkFormValid()) {

                        const res = await EmployeeApiController.updateEmployee(
                            {
                                _id: selectedEmployee.employeeId.employeeId,
                                phoneNumber: phoneNumber,
                                name: name,
                                address: address,
                                salary: salary,
                                position: position,

                            }
                        );
                        if (res.success) {
                            showSnackbar("Employee updated", "success");
                            if (additionalOnSubmit) {
                                additionalOnSubmit();
                            }
                        }
                        else {
                            showSnackbar("Failed to update employee", "error");
                        }


                    }
                    setIsSubmitting(false);
                }}>


                    <div className={cx("form-group")}>
                        <div className="employee-edit-form-body-row-label">
                            <label>Phone number</label>
                        </div>
                        <div className="employee-edit-form-body-row-input">
                            <input type="text" value={phoneNumber} onChange={(event) => {
                                setPhoneNumber(event.target.value);
                            }} />
                        </div>
                    </div>
                    <div className={cx("form-group")}>
                        <div className="employee-edit-form-body-row-label">
                            <label>Name</label>
                        </div>
                        <div className="employee-edit-form-body-row-input">
                            <input type="text" value={name} onChange={(event) => {
                                setName(event.target.value);
                            }} />
                        </div>
                    </div>
                    <div className={cx("form-group")}>
                        <div className="employee-edit-form-body-row-label">
                            <label>Address</label>
                        </div>
                        <div className="employee-edit-form-body-row-input">
                            <input type="text" value={address} onChange={(event) => {
                                setAddress(event.target.value);
                            }} />
                        </div>
                    </div>
                    <div className={cx("form-group")}>
                        <div className="employee-edit-form-body-row-label">
                            <label>Salary</label>
                        </div>
                        <div className="employee-edit-form-body-row-input">
                            <input type="text" value={salary} onChange={(event) => {
                                setSalary(event.target.value);
                            }} />
                        </div>
                    </div>
                    <div className={cx("form-group-position")}>
                        <div className="employee-edit-form-body-row-label">
                            <label>Position</label>
                        </div>
                        <Select
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
                    <div className="employee-edit-form-body-row">
                        <div className="employee-edit-form-body-row-label">
                        </div>
                        <div className="employee-edit-form-body-row-input">
                            <button type="submit" className={cx("btn-submit")}
                                disabled={isSubmitting}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmployeeEditForm;

