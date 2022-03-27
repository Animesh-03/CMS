import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user,setUser] = useState({});    //User JSON object
    const [isAuth,setAuth] = useState(false);//Is logged in boolean
    const [loading,setLoading] = useState(true); //Is loading boolean
    //Gets the user and auth from the session  storage each time componenet is loaded
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
        setAuth(sessionStorage.getItem("isAuth"));
        setLoading(false);
    },[]);
    //Sets the user and auth variables and also stores them in the session storage which is unique to each tab
    const loginUser = (newUser) => {
        setUser(newUser);
        sessionStorage.setItem("user",JSON.stringify(newUser));
        setAuth(true);
        sessionStorage.setItem("isAuth",true);
    }

    return ( 
        <UserContext.Provider value={{user: user,isAuth: isAuth,loginUser: loginUser, loading: loading}}>
            {props.children}
        </UserContext.Provider>
     );
}

export default UserContextProvider;
