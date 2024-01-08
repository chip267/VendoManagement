import apiInstance from ".";


class StatisticController {
    //Get top 5 products, then cache.
    //Customer mean the amount of customer that make purchase in the period
    //Profit is in each order. Sum all order profit in the period
    //Num of product sold is in each order detail. Sum all order detail in the period
    //Get this week stats, then cache. Include: number of product sold, number of customer, profit
    //Get this month stats, then cache. Include: number of product sold, number of customer, profit
    //Get this year stats, then cache. Include: number of product sold, number of customer, profit


    //Cache
    productWeekChartMapCache = null;
    productMonthChartMapCache = null;
    productYearChartMapCache = null;
    customerWeekChartMapCache = null;
    customerMonthChartMapCache = null;
    customerYearChartMapCache = null;
    profitWeekChartMapCache = null;
    profitMonthChartMapCache = null;
    profitYearChartMapCache = null;
    clearCache = () => {

        this.productWeekChartMapCache = null;
        this.productMonthChartMapCache = null;
        this.productYearChartMapCache = null;
        this.customerWeekChartMapCache = null;
        this.customerMonthChartMapCache = null;
        this.customerYearChartMapCache = null;
        this.profitWeekChartMapCache = null;
        this.profitMonthChartMapCache = null;
        this.profitYearChartMapCache = null;

    }
    getMostSoldProducts = async (limit = 5) => {
        try {
            const response = await apiInstance.get("api/statistic/products-most", { params: { limit: limit } });
            if (response.status === 200) {
                return response.data;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    //Get general stats
    getGeneralStats = async () => {
        try {
            const response = await apiInstance.get("api/statistic/");

            if (response.status === 200) {
                return response.data;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    getProfitMap = async ({ startDate, endDate }) => {
        try {
            const response = await apiInstance.get("api/statistic/profit", { params: { startDate, endDate } });
            if (response.status === 200) {
                return response.data;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    getCustomerMap = async ({ startDate, endDate }) => {
        try {
            const response = await apiInstance.get("api/statistic/customer-ordered", { params: { startDate, endDate } });
            if (response.status === 200) {
                return response.data;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    getProductSoldMap = async ({ startDate, endDate }) => {
        try {
            const response = await apiInstance.get("api/statistic/product-sold", { params: { startDate, endDate } });
            if (response.status === 200) {
                return response.data;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    //This week (3 maps for each chart)
    getThisWeekChartMap = async (forceRefresh = false) => {
        if (this.productWeekChartMapCache !== null && forceRefresh === false) {
            return {
                customerMap: [...this.customerWeekChartMapCache],
                productSoldMap: [...this.productWeekChartMapCache],
                profitMap: [...this.profitWeekChartMapCache]
            };
        }
        console.log("Refreshed on getThisWeekChartMap");
        try {
            //Minus 1
            const now = new Date();
            const startOfWeek = new Date();
            startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
            const endOfWeek = new Date(startOfWeek);
            // Set the day of the week to Sunday
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            startOfWeek.setDate(startOfWeek.getDate());
            endOfWeek.setDate(endOfWeek.getDate());
            const startDate = startOfWeek.toLocaleDateString("en-GB");
            const endDate = endOfWeek.toLocaleDateString("en-GB");
            const profitMap = await this.getProfitMap({ startDate, endDate });
            const customerMap = await this.getCustomerMap({ startDate, endDate });
            const productSoldMap = await this.getProductSoldMap({ startDate, endDate });
            //Get from dailyProfit/dailyCustomerOrder/dailyProductSold
            //Remove intermediate  dailyProfit/dailyCustomerOrder/dailyProductSold

            const weeklyCustomerOrders = customerMap.dailyCustomerOrders;
            const weeklyProductSolds = productSoldMap.dailyProductSolds;
            const weeklyProfits = profitMap.dailyProfits;
            //sort
            weeklyCustomerOrders.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            weeklyProductSolds.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            weeklyProfits.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            this.productWeekChartMapCache = [...weeklyProductSolds];
            this.customerWeekChartMapCache = [...weeklyCustomerOrders];
            this.profitWeekChartMapCache = [...weeklyProfits];
            console.log("Cached : ", this.productWeekChartMapCache);
            console.log("Cached : ", this.customerWeekChartMapCache);
            console.log("Cached : ", this.profitWeekChartMapCache);
            return {
                profitMap: [...weeklyProfits],
                customerMap: [...weeklyCustomerOrders],
                productSoldMap: [...weeklyProductSolds],
            };

        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    getThisMonthChartMap = async (
        forceRefresh = false
    ) => {
        if (this.productMonthChartMapCache !== null && forceRefresh === false) {
            return {
                customerMap: [...this.customerMonthChartMapCache],
                productSoldMap: [...this.productMonthChartMapCache],
                profitMap: [...this.profitMonthChartMapCache]
            };

        }
        try {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1 + 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0 + 2);
            const startDate = startOfMonth.toLocaleDateString("en-GB");
            const endDate = endOfMonth.toLocaleDateString("en-GB");
            const profitMap = await this.getProfitMap({ startDate, endDate });
            const customerMap = await this.getCustomerMap({ startDate, endDate });
            const productSoldMap = await this.getProductSoldMap({ startDate, endDate });
            //Day come from 1-31. Fill in each week 7 days so that it become week 1, week 2, week 3, week 4

            //Sort by date (newest first)

            //Go from date less than 7 
            let weeklyCustomerOrders = [{
                week: 1,
                customerOrder: 0
            },
            {
                week: 2,
                customerOrder: 0
            },
            {
                week: 3,
                customerOrder: 0
            },
            {
                week: 4,
                customerOrder: 0
            }];
            for (let i = 0; i < customerMap.dailyCustomerOrders.length; i++) {
                const day = customerMap.dailyCustomerOrders[i];
                const date = new Date(day.date);
                const week = Math.ceil(date.getDate() / 7);
                if (week > 4) {
                    continue;
                }
                weeklyCustomerOrders[week - 1].customerOrder += day.customerOrder;
            }

            let weeklyProductSolds = [{
                week: 1,
                productSold: 0
            },
            {
                week: 2,
                productSold: 0
            },
            {
                week: 3,
                productSold: 0
            },
            {
                week: 4,
                productSold: 0
            }];

            for (let i = 0; i < productSoldMap.dailyProductSolds.length; i++) {
                const day = productSoldMap.dailyProductSolds[i];
                const date = new Date(day.date);
                const week = Math.ceil(date.getDate() / 7);
                if (week > 4) {
                    continue;
                }
                weeklyProductSolds[week - 1].productSold += day.productSold;
            }

            let weeklyProfits = [{
                week: 1,
                profit: 0
            },
            {
                week: 2,
                profit: 0
            },
            {
                week: 3,
                profit: 0
            },
            {
                week: 4,
                profit: 0
            }];

            for (let i = 0; i < profitMap.dailyProfits.length; i++) {
                const day = profitMap.dailyProfits[i];
                const date = new Date(day.date);
                const week = Math.ceil(date.getDate() / 7);
                if (week > 4) {
                    continue;
                }
                weeklyProfits[week - 1].profit += day.profit;
            }
            this.productMonthChartMapCache = [...weeklyProductSolds];
            this.customerMonthChartMapCache = [...weeklyCustomerOrders];
            this.profitMonthChartMapCache = [...weeklyProfits];

            return {
                customerMap:
                    [...weeklyCustomerOrders],
                productSoldMap:
                    [...weeklyProductSolds],
                profitMap:
                    [...weeklyProfits]
            };




        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    getThisYearChartMap = async (
        forceRefresh = false
    ) => {
        if (this.productYearChartMapCache !== null && forceRefresh === false) {
            return {
                customerMap: [...this.customerYearChartMapCache],
                productSoldMap: [...this.productYearChartMapCache],
                profitMap: [...this.profitYearChartMapCache]
            };
        }
        try {

            const now = new Date();
            const startOfYear = new Date(now.getFullYear(), 0, 1 + 1);
            const endOfYear = new Date(now.getFullYear(), 11, 31 + 2);
            const startDate = startOfYear.toLocaleDateString("en-GB");
            const endDate = endOfYear.toLocaleDateString("en-GB");
            const profitMap = await this.getProfitMap({ startDate, endDate });
            const customerMap = await this.getCustomerMap({ startDate, endDate });
            const productSoldMap = await this.getProductSoldMap({ startDate, endDate });

            let yearlyCustomerOrders = []
            let yearlyProductSolds = []
            let yearlyProfits = []
            for (let i = 0; i < 12; i++) {
                yearlyCustomerOrders.push({
                    month: i + 1,
                    customerOrder: 0
                });
                yearlyProductSolds.push({
                    month: i + 1,
                    productSold: 0
                });
                yearlyProfits.push({
                    month: i + 1,
                    profit: 0
                });
            }
            for (let i = 0; i < customerMap.dailyCustomerOrders.length; i++) {
                const day = customerMap.dailyCustomerOrders[i];
                const date = new Date(day.date);
                const month = date.getMonth();
                yearlyCustomerOrders[month].customerOrder += day.customerOrder;
            }
            for (let i = 0; i < productSoldMap.dailyProductSolds.length; i++) {
                const day = productSoldMap.dailyProductSolds[i];
                const date = new Date(day.date);
                const month = date.getMonth();
                yearlyProductSolds[month].productSold += day.productSold;
            }
            for (let i = 0; i < profitMap.dailyProfits.length; i++) {
                const day = profitMap.dailyProfits[i];
                const date = new Date(day.date);
                const month = date.getMonth();
                yearlyProfits[month].profit += day.profit;
            }

            this.productYearChartMapCache = [...yearlyProductSolds];
            this.customerYearChartMapCache = [...yearlyCustomerOrders];
            this.profitYearChartMapCache = [...yearlyProfits];
            return {
                customerMap:
                    [...yearlyCustomerOrders],
                productSoldMap:
                    [...yearlyProductSolds],
                profitMap:
                    [...yearlyProfits]
            };


        }
        catch (error) {
            console.log(error);
            return null;
        }
    }


}
const StatisticAPIController = new StatisticController();
export default StatisticAPIController; 