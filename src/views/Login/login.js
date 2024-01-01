import React from "react";
import { IMG_Onboard } from "../../assets/images";
import styles from "./login.module.scss";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { UserApiController } from "../../api/user";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../api";
import { CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import axios from "axios";
const cx = classNames.bind(styles);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  const { user, setUser } = useUserContext();
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  async function handleSubmit(event) {
    try {
      setIsLoading(true);
      event.preventDefault();
      if (user !== null) {
        console.log("User already logged in");
        console.log(user);
        return;
      }
      const response = await UserApiController.login(username, password);
      if (response.name == "AxiosError") {
        setError(response);
        console.log("Error");
      } else {
        //New user data object
        const userData = { ...response.data };
        //Exclude msg property
        delete userData.msg;
        //Set user context
        setUser(userData);
        console.log("User logged in successfully");
        //Navigate to dashboardd
        navigation("/dashboard");
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);

    }
  }
  async function tryLogout() {
    try {
      const response = await UserApiController.logout();
      setUser(null);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function tryGetProducts() {
    try {
      const response = await apiInstance.get("/api/products");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function loadUser() {
    console.log("User from api: ", UserApiController.user);
    const data = await UserApiController.getCurrentUser();
    console.log("User from get user: ", data);
  }
  function printUser() {
    console.log(user);
  }
  return (
    <div className="align-middle flex flex-col items-center pb-[200px] min-h-screen justify-middle">
      <h1 className=" text-center text-[31px] font-[Lexend] font-medium text-green_main mt-[75px] ">
        Vendo
      </h1>
      <p className="text-center text-[12px] font-[Lexend] font-medium text-grey_main opacity-90 mt-[10px]">
        Login to your account
      </p>
      {error ? (
        <div className={cx("error-box")}>
          Login failed due to incorrect username or password
        </div>
      ) : null}

      {isLoading ? (
        <div className="flex justify-center mt-[100px]">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-xs font-[Lexend] font-normal text-hide_txt">
            <input
              type="text"
              className=" w-[307px] h-[43px] rounded-md p-4 mt-[21px] placeholder-hide_txt bg-light_green"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div className="text-xs font-[Lexend] font-normal text-hide_txt">
            <input
              type="password"
              className=" w-[307px] h-[43px] rounded-md p-4 mt-[15px] placeholder-hide_txt bg-light_green"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex">
            <div className="w-[90px] text-[10px] font-[Lexend] font-semibold text-grey_main mt-2 ">
              <button>Remember me</button>
            </div>
            <div className="ml-[130px] text-[10px] font-[Lexend] font-semibold text-green_main mt-2 ">
              <button className="underline">Forgot password?</button>
            </div>
          </div>
          <div className="mt-9">
            <button className="bg-green_main w-[307px] h-10 rounded-[10px] text-white text-xs font-[Lexend] font-regular" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="flex">
            <p className="text-center text-[10px] font-[Lexend] font-medium text-grey_main opacity-90 mt-[10px]">
              Do you have an account?
            </p>
            <div className="ml-[5px] text-center text-[10px] font-[Lexend] font-medium text-green_main opacity-90 mt-[10px]">
              <button className="underline">Sign up</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;
