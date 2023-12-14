import React, { useState } from "react";
import styles from './customers.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";
//import images from "../../assets/images";
import ReactPaginate from 'react-paginate';


const cx = classNames.bind(styles);

function Customers() {

    return (
      <div className={cx("container")}>
            <div className={cx("header")}>
                <h2>Customer</h2>
            </div>
            <div className={cx("mini-home-logo")}>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                    <path opacity="1" fill="#1E3050" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                </svg>
              </button>
            </div>
            <div className={cx("btn-bar")}>
              <span>
                <input className={cx("search-bar")} type="text number" placeholder="Search"/>
              </span>
              <span>
                <button className={cx("btn-add")}>+ Add Customer</button>
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
                    <td className={cx("name-title")}>
                      Customer
                      <button>
                        <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                          <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                        </svg>
                      </button>
                    </td>
                    <td>Customer Code 
                      <button>
                        <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                            <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                        </svg>
                      </button>
                    </td> 
                    <td>Bought 
                      <button>
                        <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                            <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                        </svg>
                      </button>
                    </td>
                    <td>Type 
                      <button>
                        <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                            <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                        </svg>
                      </button>
                    </td>
                    <td>Membership 
                      <button>
                        <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                            <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                        </svg>
                      </button>
                    </td>
                    <td>Latest Order 
                      <button>
                        <svg className={cx("sort-icon")} xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 320 512">
                            <path opacity="1" fill="#1E3050" d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/>
                        </svg>
                    </button>
                  </td>
                    <td></td>
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
                    <td>67</td>
                    <td className={cx("type")}>Member</td>
                    <td className={cx("membership")}>
                      <div className={cx("mem-gold")}>Gold</div>
                    </td>
                    <td>Oct 03, 2021</td>
                    <td className={cx("delete")}>
                      <button className={cx("btn-delete")}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 384 512">
                          <path opacity="1" fill="#1E3050" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
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

export default Customers;