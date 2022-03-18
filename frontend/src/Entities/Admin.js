class Admin
{
    constructor(username,password,fName,lName)
    {
        this.username = username;
        this.password = password;
        this.fName = fName;
        this.lName = lName;
    }

    static fromJSON(adminJSON)
    {
        return(Admin(adminJSON.username,adminJSON.password,adminJSON.fName,adminJSON.lName));
    }
}