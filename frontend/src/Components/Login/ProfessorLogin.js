import React from 'react';
import { Outlet } from 'react-router';

const ProfessorLogin = () => {

    return ( 
        <div className='professor-login-form'>
            <p>Professor Login</p>

            <Outlet/>
        </div>

        
    );
}
 
export default ProfessorLogin;