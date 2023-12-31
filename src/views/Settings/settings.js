import React from "react";
import { UserApiController } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import classNames from "classnames/bind";
import styles from "./settings.module.scss";
import { List } from "@mui/material";
import { CircularProgress } from "@mui/material"
const cx = classNames.bind(styles);
function Settings() {
  const { user, setUser } = useUserContext();
  const Navigation = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
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

  const page = () => {
    return (
      <div className={cx("settings-container")}>
        <h1 className={cx("settings-title")}>
          Settings
        </h1>
        <div className={cx("settings-info")}>
          <p className={cx("settings-info-username")}>
            User name: {user ? user.username : ""}
          </p>
          <p className={cx("settings-info-role")}>
            Role: {user ? user.role : ""}
          </p>
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
          <CircularProgress />
        </div>
      ) : (
        page()
      )}
    </div>
  );

}

export default Settings;
