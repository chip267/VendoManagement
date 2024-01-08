import React, { useEffect } from "react";
import { UserApiController } from "../../api/user";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./settings.module.scss";
import { List } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { CircularProgress } from "@mui/material"
import EmployeeApiController from "../../api/employee";
import { useUserContext } from "../../context/UserContext";
const cx = classNames.bind(styles);

function Settings() {
  const { user, setUser } = useUserContext();
  const Navigation = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [employeeInfo, setEmployeeInfo] = React.useState(null);
  const { paginationLimit, setPaginationLimit } = useUserContext();
  //Log out 
  const logOut = async () => {
    setIsLoading(true);
    const response = await UserApiController.logout();
    if (response.success) {
      setUser(null);
      Navigation("/signin");
    }
    else {
      console.log("Log out failed");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const formatPosition = (position) => {
    if (position === "admin") {
      return "Admin";
    }
    else if (position === "sale") {
      return "Front sale";
    }
    else if (position === "warehouse") {
      return "Warehouse staff";
    }
    else {
      return "Unknown";
    }
  }
  const fetchData = async () => {
    setIsLoading(true);

    if (user) {
      if (EmployeeApiController.getCurrentEmployee() === null) {
        const response = await EmployeeApiController.getEmployee(user.employeeId);
        if (response.success) {
          if (user.role === "admin") {

            let employee = response.data.employee;
            employee.salary = "999.999.000";
            setEmployeeInfo(employee);
            EmployeeApiController.setCurrentEmployee(employee);
          }
          else {
            let employee = response.data.employee;
            setEmployeeInfo(employee);
          }
        }
      }
      else {
        if (user.role === "admin") {
          let employee = EmployeeApiController.getCurrentEmployee();
          employee.salary = "999.999.000"
          setEmployeeInfo(employee);
        }
        else {
          let employee = EmployeeApiController.getCurrentEmployee();

          setEmployeeInfo(employee);
        }
      }

    }

    setIsLoading(false);
  }
  const page = () => {
    return (
      <div className={cx("settings-container")}>
        <h1 className={cx("settings-title")}>
          Settings
        </h1>
        <div className={cx("settings-info")}>
          <p className={cx("settings-info-username")}>
            Username: {user ? user.username : ""}
          </p>
          <p className={cx("settings-info-role")}>
            Role: {user ? user.role : ""}
          </p>
          <p className={cx("settings-info-role")}>
            Position : {employeeInfo ? formatPosition(employeeInfo.position) : ""}
          </p>
          <p className={cx("settings-info-employee")}>
            Name: {employeeInfo ? employeeInfo.name : ""}
          </p>
          <p className={cx("settings-info-salary")}>
            Salary: {employeeInfo ? employeeInfo.salary + " VND" : ""}
          </p>
        </div>

        <div className={cx("settings-pagination")}>
          <p className={cx("settings-pagination-title")}>
            Results per page:
          </p>
          <div className={cx("settings-pagination-select")}>
            <List>
              <Select
                onChange={(event) => {
                  setPaginationLimit(event.target.value);
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paginationLimit}
                label="Age"
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </List>

          </div>
        </div>
        <button className={cx("logout-btn")} onClick={logOut}>
          Log out
        </button>
      </div>
    );
  };
  return (
    <div className={cx("settings")}>
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <CircularProgress
            sx={{
              color: "#2C7A51"
            }}
          />
        </div>
      ) : (
        page()
      )}
    </div>
  );

}

export default Settings;
