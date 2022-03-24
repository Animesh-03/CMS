import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const AdminDashboard = () => {
    const {user, isAuth} = useContext(UserContext); //Gets the user and auth variable from User Context
    const navigate = useNavigate();

    return ( 
        <div className='admin-dashboard'>
            <p>Username is {user != null && user.username}</p>
            <p>Authenicated: {isAuth != null && isAuth.toString()}</p>

            <button className="add-student-redirect" onClick={() => navigate("/admin/add/student")}>Add Student</button>
        </div>
     );
}
 
export default AdminDashboard;