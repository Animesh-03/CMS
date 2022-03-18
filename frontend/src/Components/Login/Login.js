import React from 'react';
import { Outlet, useNavigate } from 'react-router';

const Login = () => {

    const navigate = useNavigate();

    return ( 
        <div className='login'>
            <div className='admin-login'>
                <button id="admin-login-button" onClick={() => navigate("/admin")}>Login as Admin</button>
            </div>

            <div className='student-login'>
                <button id="admin-login-button" onClick={() => navigate("/student")}>Login as Student</button>
            </div>

            <div className='professor-login'>
                <button id="admin-login-button" onClick={() => navigate("/professor")}>Login as Professor</button>
            </div>


            <Outlet/>
        </div>
     );
}
 
export default Login;