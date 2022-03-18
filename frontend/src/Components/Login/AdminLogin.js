import React, { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { AdminContext } from '../Contexts/AdminContext';

const AdminLogin = () => {
    const navigate = useNavigate();
    const {changeUser, toggleAuth} = useContext(AdminContext);

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");

        changeUser({username: username});
        toggleAuth(true);

        password.toString();    //Remove line later

        navigate("/admin/dashboard");
    }

    return ( 
        <div className='admin-login-form'>
            <h1> Admin Login </h1>

            <form className='mb-3' onSubmit={(e) => {handleSubmit(e)}}>
                <label htmlFor='admin-username' className='form-label'>Username</label>
                <input typeof='text' className='form-control' id="admin-username" placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} required />
                <label htmlFor='admin-password' className='form-label'>Password</label>
                <input typeof='password' className='form-control' id="admin-password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit' >Login</button> 
            </form>


            <Outlet/>
        </div>
    );
}
 
export default AdminLogin;