import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user,setUser] = useState({});
    const [isAuth,setAuth] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
        setAuth(sessionStorage.getItem("auth"));
    },[])

    const loginUser = (newUser) => {
        setUser(newUser);
        sessionStorage.setItem("user",JSON.stringify(newUser));
        setAuth(true);
        sessionStorage.setItem("isAuth",true);
    }

    return ( 
        <UserContext.Provider value={{user: user,isAuth: isAuth,loginUser: loginUser}}>
            {props.children}
        </UserContext.Provider>
     );
}

export default UserContextProvider;
