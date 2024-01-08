import React, { useState } from "react";
import styles from './dashboard.module.scss';
import classNames from "classnames/bind";
import "@fontsource/lexend";
import { IMG_Logo } from "../../assets/images";
import BestSellingItem from "./components/bestSellingItem";
import InfoHeader from "./components/InfoHeader";
import { BarChart } from "@mui/x-charts";
import ChartHeader from "./components/Chart/components/ChartHeader";
import OptionsHeader from "./components/OptionsHeader";
import StatisticAPIController from "../../api/statistic";
import { CircularProgress, Tooltip } from "@mui/material";
import { ChartsYAxis } from "@mui/x-charts";
import { useEffect } from "react";
const imgLogoUrl = IMG_Logo;
const cx = classNames.bind(styles);

function Dashboard() {
  const [statisticData, setStatisticData] = useState(null);
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [periodOption, setPeriodOption] = useState("week");
  const [isSwitchingPeriod, setIsSwitchingPeriod] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedChartData, setSelectedChartData] = useState([0, 0, 0, 0, 0, 0, 0]);
  //[customerMap, productSoldMap, profitMap
  //Format for chart: productSoldMap.dailyProductSolds = [date(DD-MM-YYYY), productSold] 
  //Format for chart: customerMap.dailyCustomerOrders = [date(DD-MM-YYYY), customerOrder]
  //Format for chart: profitMap.dailyProfits = [date(DD-MM-YYYY), profit]
  const [chartData, setChartData] = useState(null);
  const [chartOption, setChartOption] = useState({ value: 'products', text: 'Products sold' });
  useEffect(() => {
    FetchAllData();

  }, []);
  const FetchAllData = async (
    forceRefresh = false
  ) => {
    setIsRefreshing(true);
    await FetchMostSoldProducts();
    await FetchStatisticData();
    await FetchChartData(forceRefresh);
    setIsRefreshing(false);
  }
  const RefreshData = async () => {
    setIsRefreshing(true);
    await FetchAllData(true);
    setIsRefreshing(false);
  }


  const FetchStatisticData = async () => {
    try {
      const response = await StatisticAPIController.getGeneralStats();
      if (response !== null) {
        //Sort by date (newest first)
        setStatisticData(response);
      }
      else {
        console.log("Fetch statistic data failed");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const FetchMostSoldProducts = async () => {
    try {
      const response = await StatisticAPIController.getMostSoldProducts();
      if (response !== null) {

        setMostSoldProducts(response);
      }
      else {
        console.log("Fetch most sold products failed");
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  const FetchChartData = async (forceRefresh = false
  ) => {
    try {
      //CHeck period
      setIsRefreshing(true);
      let response = null;
      switch (periodOption) {
        case 'week':
          response = await StatisticAPIController.getThisWeekChartMap(forceRefresh);
          break;
        case 'month':
          response = await StatisticAPIController.getThisMonthChartMap(forceRefresh);
          break;
        case 'year':
          response = await StatisticAPIController.getThisYearChartMap(forceRefresh);
          break;
        default:
          response = await StatisticAPIController.getThisWeekChartMap(forceRefresh);
      }
      //All data contain: 
      // customerMap, productSoldMap, profitMap
      // All data is sorted
      setChartData(response);

    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsRefreshing(false);
      const newOptionObj = { value: chartOption.value, text: chartOption.text };
      setChartOption(newOptionObj);
    }

  }

  useEffect(() => {
    onChartFilterChange();
  }, [chartOption]);

  //On option change 
  useEffect(() => {
    FetchChartData();
  }, [periodOption]);
  const onChartFilterChange = async () => {
    if (chartData !== null) {
      setChartDataToDisplay();
    }

  }


  const setChartDataToDisplay = () => {
    // Determine which data to use based on the selected chart option
    // [value]
    setIsSwitchingPeriod(true);
    let data = []
    if (chartData === null) {
      return;
    }
    console.log("Chart data: ", chartData);
    switch (chartOption.value) {
      case 'products':
        data = chartData ? chartData.productSoldMap : [];
        data = data.map((productSold) => {
          return productSold.productSold;
        });
        break;
      case 'customers':
        data = chartData ? chartData.customerMap : [];
        data = data.map((customer) => {
          return customer.customerOrder;
        });

        break;
      case 'profit':
        data = chartData ? chartData.profitMap : [];
        data = data.map((profit) => {
          return profit.profit;
        });
        break;
      default:
        data = chartData ? chartData.productSoldMap.dailyProductSolds : [];
    }

    setSelectedChartData(data);
    setIsSwitchingPeriod(false);
  }
  const toChartLabel = (option) => {
    switch (option.value) {
      case 'products':
        return 'Products sold';
      case 'customers':
        return 'Customers';
      case 'profit':
        return 'Profit';
      default:
        return 'Products sold';
    }
  }

  const toChartColor = (option) => {
    switch (option.value) {
      case 'products':
        return '#2C7A51';
      case 'customers':
        return '#FABC50';
      case 'profit':
        return '#4682B4';
      default:
        return '#2C7A51';
    }
  }
  const periodToChartBand = (period) => {
    switch (period) {
      case 'week':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'month':
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      case 'year':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", "Dec"];
      default:
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  }


  useEffect(() => {
    console.log("Selected chart data: ", selectedChartData);
  }, selectedChartData);
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h1>Dashboard</h1>
      </div>
      <div className={cx("wrap-all") + " dashboard-content"}>
        <div className="flex flex-row">
          <div className="flex flex-col w-[60%] overview-side">

            <OptionsHeader rightSideOptions={[
              { value: "week", text: "This week" },
              { value: "month", text: "This month" },
              { value: "year", text: "This year" }

            ]}
              rightSideOnChange={setPeriodOption}
            />
            <InfoHeader info={statisticData !== null ? { totalCustomer: statisticData.totalCustomer, totalProduct: statisticData.totalProduct, totalProfit: statisticData.totalProfit } : { totalCustomer: 0, totalProduct: 0, totalProfit: 0 }} />

            <div className={cx("chart-container")}>
              <ChartHeader chartOptions={[
                { value: "products", text: "Products sold" },
                { value: "customers", text: "Customers" },
                { value: "profit", text: "Profit" }
              ]}
                onOptionChange={setChartOption}
                onRefresh={RefreshData}
              />
              {isRefreshing || isSwitchingPeriod
                ? (
                  <div className={cx("loading-chart")}>
                    <CircularProgress
                      sx={{
                        color: "#2C7A51",
                        width: "100px",
                        height: "100px"
                      }}

                    />
                  </div>

                ) : (
                  <BarChart

                    xAxis={[{
                      scaleType: 'band',
                      //Set from date
                      data: periodToChartBand(periodOption),
                    }]}
                    series={
                      [
                        {
                          scaleType: 'band',
                          data: selectedChartData.length > 0 ? selectedChartData : [0, 0, 0, 0, 0, 0, 0],
                          label: toChartLabel(chartOption), color: toChartColor(chartOption),
                          type: 'bar'
                        },


                      ]}
                    //40vh
                    height={400}

                  />
                )}
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
                    <th className={cx("bs-code")}>Sold</th>
                    <th className={cx("bs-price")}>Price</th>
                  </tr>
                </thead>
                <tbody>

                  {mostSoldProducts.map((product, index) => {

                    return <BestSellingItem key={index} name={product.productName} price={product.sellPrice} code={product.sold} imageURL={product.images[0].url} />

                  })}


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
