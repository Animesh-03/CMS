import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';

const AdminDashboard = () => {
    // const {adminUser, isAdminAuthenticated} = useContext(AdminContext); //Gets the currentUser and isAuthenticated from the UserContext
    // console.log(adminUser);

    const {user, isAuth} = useContext(UserContext);

    return ( 
        <div className='admin-dashboard'>
            <p>Username is {user.username}</p>
            <p>Authenicated: {isAuth.toString()}</p>
        </div>
     );
}
 
export default AdminDashboard;