
class Order {
    //id, customerId (contains customer id, name), employeeId (contains employee id, name), orderDate, paymentMethod, status, totalValue, profit , array of orderDetails (id)
    constructor({ _id,
        customerId,
        employeeId,
        orderDate,
        status,
        total,
        profit,
        orderDetails,
    }) {
        this._id = _id;
        this.customerId = customerId;
        this.employeeId = employeeId;
        this.orderDate = orderDate;
        this.status = status;
        this.total = total;
        this.profit = profit;
        this.orderDetails = orderDetails;
    }

}
export default Order;