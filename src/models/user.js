

//User class that contains id, role and name. Used to store data that will be used to post/ get data from the database.
//Also contains optional password  that is used for login and register.
class User {
    constructor(id, role, name, password = "") {
        this.id = id;
        this.role = role;
        this.name = name;
        this.password = password;
    }

}

export default User;