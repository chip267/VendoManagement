



class Employee {
    constructor(
        employeeId,
        username,
        phoneNumber,
        name,
        address,
        salary,
        position,
    ) {
        this.employeeId = employeeId;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.address = address;
        this.salary = salary;
        this.position = position;
        this.accountStatus = this.username !== null ? "Active" : "Inactive";
    }
}
export default Employee;