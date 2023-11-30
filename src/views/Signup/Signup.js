import React from "react";
function Signup() {
  return (
    <div className=" align-middle flex flex-col items-center pb-[200px]">
      <h1 className=" text-center text-[31px] font-[Lexend] font-medium text-green_main mt-[75px] ">
        Sign up
      </h1>
      <p className="text-center text-[12px] font-[Lexend] font-medium text-grey_main opacity-90 mt-[10px]">
        Create your new account
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
      <div className="text-xs font-[Lexend] font-normal text-hide_txt">
        <input
          class=" w-[307px] h-[43px] rounded-md p-4 mt-[15px] placeholder-hide_txt bg-light_green"
          placeholder="Retype password"
        />
      </div>
      <div className="flex">
        <p className="text-center text-[10px] font-[Lexend] font-medium text-green_main  opacity-90 mt-[30px]">
          By signing you agree to our
        </p>
        <p className="ml-[3px] text-center text-[10px] font-[Lexend] font-medium text-grey_main opacity-90 mt-[30px]">
          Team of use
        </p>
      </div>
      <div className="flex">
        <p className="text-center text-[10px] font-[Lexend] font-medium text-green_main  opacity-90">
          and
        </p>
        <p className="ml-[3px] text-center text-[10px] font-[Lexend] font-medium text-grey_main opacity-90">
          privacy notice
        </p>
      </div>
      <div className="mt-9">
        <button className="bg-green_main w-[307px] h-10 rounded-[10px] text-white text-xs font-[Lexend] font-regular">
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
