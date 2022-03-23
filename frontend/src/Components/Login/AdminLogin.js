import React, { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';

const AdminLogin = () => {
    const navigate = useNavigate();
    const {user, loginUser} = useContext(UserContext);

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");

        axios.get("http://localhost:3000/login/admin",{
            username: username,
        }).then(res => {

        });

        loginUser({username: username});
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