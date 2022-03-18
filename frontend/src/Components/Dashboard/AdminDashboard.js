import React, { useContext } from 'react';
import { AdminContext } from '../Contexts/AdminContext';

const AdminDashboard = () => {
    const {adminUser, isAdminAuthenticated} = useContext(AdminContext); //Gets the currentUser and isAuthenticated from the UserContext
    console.log(adminUser);

    return ( 
        <div className='admin-dashboard'>
            <p>Username is {adminUser.username}</p>
            <p>Authenicated: {isAdminAuthenticated.toString()}</p>
        </div>
     );
}
 
export default AdminDashboard;