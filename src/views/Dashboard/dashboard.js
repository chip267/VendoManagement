import React from "react";
import styles from './dashboard.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";

const cx = classNames.bind(styles);

function Dashboard() {
  // return (
  //   <div className=" align-middle flex flex-col items-center pb-[200px]">
  //     <h1 className=" text-center text-[31px] font-[Lexend] font-medium text-green_main mt-[75px] ">
  //       Dashboard
  //     </h1>
  //   </div>
  // );

  return (
    <div className={cx("container")}>
        <div className={cx("header")}>
                    <h1>Dashboard</h1>
        </div>

        <div className={cx("wrap-all")}>

        <div className={cx("options")}>
          <table className={cx("tb1")}>
            <tr>
              <td className={cx("opt-left")}>
                <span href="#">Overview</span> 
                <span href="#">Activity</span>
              </td>
              <td className={cx("opt-right")}>
                <select>
                  <option value="this-day">This day</option>
                  <option value="this-week">This week</option>
                  <option value="this-month">This month</option>
                </select>
              </td>
            </tr>
          </table>      
        </div>
        <div className={cx("box-info")}>
                    {/* <div className={cx("total-products")}>
                        <table>
                            <tr>
                                <td>
                                    <img scr="" width="49px" height="46px" />
                                </td>
                                <td>
                                    <p className={cx("title")}>Total products</p>
                                    <p className={cx("content")}>150,800K</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className={cx("total-customers")}>
                        <table>
                            <tr>
                                <td>
                                    <img scr="" width="49px" height="46px" />
                                </td>
                                <td>
                                    <p className={cx("title")}>Total customers</p>
                                    <p className={cx("content")}>150,800K</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className={cx("total-sales")}>
                        <table>
                            <tr>
                                <td>
                                    <img scr="" width="49px" height="46px" />
                                </td>
                                <td>
                                    <p className={cx("title")}>Total sales</p>
                                    <p className={cx("content")}>150,800K</p>
                                </td>
                            </tr>
                        </table>
                    </div> */}
          <li>
            <div className={cx("logo")}>
              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 320 512">
                <path opacity="1" fill="#1E3050" d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"/>
              </svg>
            </div>
            <span class={cx("text")}>
              <p>Total products</p>
              <h3>150,800K</h3>
            </span>
          </li>
          <li>
            <div className={cx("logo")}>
              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512">
                <path opacity="1" fill="#1E3050" d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240V160zm208 32H0V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192z"/>
              </svg>
            </div>
            <span class={cx("text")}>             
              <p>Total customers</p>
              <h3>150,800K</h3>
            </span>
          </li>
          <li>
            <div className={cx("logo")}>
              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512">
                <path opacity="1" fill="#1E3050" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
              </svg>
            </div>
            <span class={cx("text")}>              
              <p>Total sales</p>
              <h3>$900k</h3>
            </span>
          </li>


        </div>
        <div className={cx("chart")}>
                    <table className={cx("tb2")}>
                        <tr height="20%">
                            <td className={cx("left")}>
                                <a>Retail overview</a>
                            </td>
                            <td className={cx("right")}>
                                <button className={cx("in-chart-sale")}>Sale</button>
                                <button className={cx("in-chart-product")}>Product</button>
                                <button className={cx("in-chart-customer")}>Customer</button>
                            </td>
                        </tr>
                        <tr>

                        </tr>
                    </table>
        </div>

        
        <div className={cx("best-selling-product")}>
            
                <div className={cx("table-title")}>
                  
                    <h3>Best selling products</h3>
                  
                </div>

                <table className={cx("bs-table")}>
                  <thead>
                    <tr className={cx("label" )}>
                      <th className={cx("bs-name")}>Product Name</th>
                      <th className={cx("bs-code")}>Product Code</th>
                      <th className={cx("bs-price")}>Price</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    <tr className={cx("data")}>
                      <td className={cx("product")}>
                        <img scr="" alt="" />
                        <div className={cx("product-name")}>Product Name 1</div>
                      </td>
                      <td className={cx("code")}>
                        <div>ABC123</div>
                      </td>
                      <td className={cx("price")}>
                        <div>$19.99</div>
                      </td>
                    </tr>
                  </tbody>
                  
                </table>
            
        </div>
        {/* <div className={cx("table-data")}>
        <div className={cx("order")}>
            <div class="head">
              <h3>Recent Orders</h3>
            </div>

            <table className={cx("best-sale")}>
                <tr className={cx("label" )}>
                  <th className={cx("bs-name")}>Product Name</th>
                  <th className={cx("bs-code")}>Product Code</th>
                  <th className={cx("bs-price")}>Price</th>
                </tr>

                <tr className={cx("data")}>
                  <td className={cx("product")}>
                    <img scr="" alt="" />
                    <div className={cx("product-name")}>Product Name 1</div>
                  </td>
                  <td className={cx("code")}>
                    <div>ABC123</div>
                  </td>
                  <td className={cx("price")}>
                    <div>$19.99</div>
                  </td>
                </tr>
            </table>
        </div> 

        </div>*/}
      </div>
    </div>
  );
}

export default Dashboard;
