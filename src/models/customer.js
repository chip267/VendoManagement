
class Customer {
    constructor({ _id,
        name,
        phoneNumber,
        address = null,
        totalValueBought,
        latestOrderDate = null,
    }) {
        this._id = _id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.totalValueBought = totalValueBought;
        this.latestOrderDate = latestOrderDate;
    }
}
export default Customer;