import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';

const AdminDashboard = () => {
    const {user, isAuth} = useContext(UserContext); //Gets the user and auth variable from User Context

    return ( 
        <div className='admin-dashboard'>
            <p>Username is {user != null && user.username}</p>
            <p>Authenicated: {isAuth != null && isAuth.toString()}</p>
        </div>
     );
}
 
export default AdminDashboard;