import React from 'react';
import { Outlet } from 'react-router';

const StudentLogin = () => {

    return ( 
        <div className='student-login-form'>
            <p>Student Login</p>
            
            <Outlet/>
        </div>
    );
}
 
export default StudentLogin;