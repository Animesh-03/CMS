import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';

const StudentDashboard = () => {
    const {user} = useContext(UserContext);


    return ( 
        <div className='student-dashboard'>
            <h1>Hello {user!= null && user.first_name}</h1>
        </div>
     );
}
 
export default StudentDashboard;