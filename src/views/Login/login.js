import React from "react";
import { IMG_Onboard } from "../../assets/images";
import styles from "./login.module.scss";

function Login() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Vendo</h1>
      <p className={styles.subTitle}>Login to your account</p>
      <div className={styles.txtInput1}>
        <input class={styles.inputContainer1} placeholder="Email" />
      </div>
      <div className={styles.txtInput1}>
        <input class={styles.inputContainer2} placeholder="Password" />
      </div>
      <div className="flex">
        <div className={styles.flexTxtLeft}>
          <button>Remember me</button>
        </div>
        <div className={styles.flexTxtRight}>
          <button className="underline">Forgot password?</button>
        </div>
      </div>
      <div className="mt-9">
        <button className={styles.btnBottom}>Login</button>
      </div>
      <div className="flex">
        <p className={styles.txtBottom}>Do you have an account?</p>
        <div className={styles.txtUdl}>
          <button className="underline">Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
