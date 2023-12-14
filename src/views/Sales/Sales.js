import React from "react";
import styles from './sales.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";

const cx = classNames.bind(styles);

function Sales() {
  return (
    // <div className=" align-middle flex flex-col items-center pb-[200px]">
    //   <h1 className=" text-center text-[31px] font-[Lexend] font-medium text-green_main mt-[75px] ">
    //     Sales
    //   </h1>
    // </div>

    <div className={cx("container")}>
        <div className={cx("header")}>
            <h2>Sales</h2>
        </div>
        <div className={cx("btn-bar")}>
            <span>
                <input className={cx("search-bar")} type="text number" placeholder="Search"/>
            </span>
            <span className={cx("btn-setting")}>
                <button>
                    <svg className={cx("sliders-logo")} xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512">
                        <path opacity="1" fill="#1E3050" d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/>
                    </svg>
                </button>
            </span>
        </div>
        <div className={cx("table-content")}>
            <table>
                <thead>
                    <tr className={cx("label")}>
                        <td>
                            <input className={cx("checkmark")} type="checkbox" />
                        </td>
                        <td className={cx("name-title")}> Create By 
                            <button>
                                <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                                    <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                                </svg>
                            </button>
                        </td>
                        <td>Sales Code
                            <button>
                                <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                                    <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                                </svg>
                            </button>
                        </td> 
                        <td>Sales Channel
                            <button>
                                <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                                    <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                                </svg>
                            </button>
                        </td>
                        <td>Date Created
                            <button>
                                <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                                    <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                                </svg>
                            </button>
                        </td>
                        <td>Payment method
                            <button>
                                <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                                    <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                                </svg>
                            </button>
                        </td>
                        <td className={cx("label-status")}>Status
                            <button>
                                <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                                    <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                                </svg>
                            </button>
                        </td>
                        <td>

                        </td>
                    </tr>
                </thead>
                
                <tbody>
                    <tr className={cx("data")}>
                        <td><input className={cx("checkmark")} type="checkbox" /></td>
                        <td className={cx("people")}>
                            <img className={cx("avatar")} src="" alt="" />
                            <div className={cx("people-de")}>Nguyen Van A</div>
                        </td>
                        <td>#KGA57</td>
                        <td>At store</td>
                        <td className={cx("date-create")}>Oct 03, 2021</td>
                        <td className={cx("payment-method")}>by cash</td>
                        <td className={cx("status")}>
                            <div className={cx("status-state")}>Completed</div>
                        </td>
                        <td className={cx("detail")}>
                            <button className={cx("btn-detail")}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="12" width="10.75" viewBox="0 0 448 512">
                                    <path fill="#2c7a51" d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>

    </div>
  );
}

export default Sales;
