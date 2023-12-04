import React from "react";
import { IMG_Onboard } from "../../assets/images";
import styles from "./login.module.scss";

function Login() {
  return (
    <div className=" align-middle flex flex-col items-center pb-[200px]">
      <h1 className=" text-center text-[31px] font-[Lexend] font-medium text-green_main mt-[75px] ">
        Vendo
      </h1>
      <p className="text-center text-[12px] font-[Lexend] font-medium text-grey_main opacity-90 mt-[10px]">
        Login to your account
      </p>
      <div className="text-xs font-[Lexend] font-normal text-hide_txt">
        <input
          class=" w-[307px] h-[43px] rounded-md p-4 mt-[21px] placeholder-hide_txt bg-light_green"
          placeholder="Email"
        />
      </div>
      <div className="text-xs font-[Lexend] font-normal text-hide_txt">
        <input
          class=" w-[307px] h-[43px] rounded-md p-4 mt-[15px] placeholder-hide_txt bg-light_green"
          placeholder="Password"
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
        <button className="bg-green_main w-[307px] h-10 rounded-[10px] text-white text-xs font-[Lexend] font-regular">
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
  );
}

export default Login;
