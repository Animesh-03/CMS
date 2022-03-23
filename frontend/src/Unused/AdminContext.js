import React, {Component, createContext } from 'react';

export const AdminContext = createContext();

class AdminContextProvider extends Component {
    state = { 
        adminUser : {},
        isAdminAuthenticated : false,
    }
    // Gets the user and isAuth from the local storage(if not null) every time the page reloads
    componentDidMount()
    {
        if(localStorage.getItem("adminUser") != null)
        {
            this.setState({adminUser: JSON.parse(localStorage.getItem("adminUser"))});
        }

        if(localStorage.getItem("isAdminAuthenticated") != null)
        {
            this.setState({isAdminAuthenticated: localStorage.getItem("isAdminAuthenticated")});
        }
    }
    //Sets the currentUser to the newUser and stores the new user in local storage
    loginUser = (newUser, callback = null) => {
        localStorage.setItem("adminUser", JSON.stringify(newUser));
        this.toggleAuth(true);
        this.setState({currentUser: newUser});
        setTimeout(callback,10000);
    }
    //Toggles isAuthenticated and sets it to local storage
    toggleAuth = (bool) => {
        this.setState({isAuthenticated: bool});
        localStorage.setItem("isAdminAuthenticated",bool);
    }

    render() { 
        return (
            <AdminContext.Provider value={{...this.state, loginUser: this.loginUser, toggleAuth: this.toggleAuth}}>
                {this.props.children}
            </AdminContext.Provider>
        );
    }
}
 
export default AdminContextProvider;