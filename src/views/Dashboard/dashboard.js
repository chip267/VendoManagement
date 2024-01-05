import React from "react";
import styles from './dashboard.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";
import { IMG_Logo } from "../../assets/images";
import BestSellingItem from "./components/bestSellingItem";
import InfoHeader from "./components/InfoHeader";
import { BarChart } from "@mui/x-charts";
import ChartHeader from "./components/Chart/components/ChartHeader";
import OptionsHeader from "./components/OptionsHeader";


const imgLogoUrl = IMG_Logo;
const cx = classNames.bind(styles);
function Dashboard() {
  const [statisticData, setStatisticData] = React.useState(null);
  const RefreshData = () => {
    console.log("refresh data");
  }
  const OnChartOptionChange = (e) => {
  }
  const OnChartPeriodChange = (e) => {
  }
  const FetchStatisticData = () => {
    //Fetch from api cache. 
    //Only fetch when cache is empty or refresh button is clicked
  }
  //Fetch then cache, not fetch every time
  React.useEffect(() => {
    FetchStatisticData();
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h1>Dashboard</h1>
      </div>
      <div className={cx("wrap-all") + " dashboard-content"}>
        <div className="flex flex-row">
          <div className="flex flex-col w-[60%] overview-side">
            <OptionsHeader rightSideOptions={[{ value: "1", text: "This week" }, { value: "2", text: "This month" }, { value: "3", text: "This year" }]} />
            <InfoHeader info={{ products: 100000, customers: 100000, sales: 100000 }} />

            <div className={cx("chart-container")}>
              <ChartHeader chartOptions={[
                { value: "Sale", text: "Sale" },
                { value: "Revenue", text: "Revenue" },
                { value: "Profit", text: "Profit" }
              ]} />
              <BarChart
                xAxis={[{
                  scaleType: 'band',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                }]}
                series={
                  [
                    { data: [25, 3, 5, 15, 4, 16, 4], type: 'bar', label: 'Products sold', color: '#2C7A51' },
                    { data: [2, 15, 6, 4, 5, 1, 3], type: 'bar', label: 'Customer', color: '#FABC50 ' },
                    { data: [1, 24, 3, 14, 3, 0.5, 1.5], type: 'bar', label: 'Profit', color: '#4682B4' },

                  ]}
                //40vh
                height={400}

              />
            </div>

          </div>
          <div className="flex flex-col w-[40%] best-selling-side">
            <div className={cx("best-selling-product")}>
              <div className={cx("table-title")}>
                <h3>Best selling products</h3>
              </div>
              <table className={cx("bs-table")}>
                <thead>
                  <tr className={cx("label")}>
                    <th className={cx("bs-name")}>Product Name</th>
                    <th className={cx("bs-code")}>Product Code</th>
                    <th className={cx("bs-price")}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <BestSellingItem name="IphoneSSS 12" price="$1000" code="123456" imageURL={imgLogoUrl} />

                </tbody>

              </table>

            </div>

          </div>
        </div>
      </div>
    </div >
  );
}

export default Dashboard;
