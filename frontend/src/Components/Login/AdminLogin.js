import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';

const AdminLogin = () => {
    const navigate = useNavigate();
    const {loginUser} = useContext(UserContext);

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        //Prevents page from reloading on its own
        e.preventDefault(); 
        //Sends a request to get the user with the username given
        axios.post("http://localhost:3000/login/admin",{
            data: {username: username}
        }).then(res => {
            //If a user is found with the given username and password matches then login the admin
            if(res.data.length !== 0 && password === res.data[0].password)
            {
                loginUser({username: username, role: "admin"});
                navigate("/admin/dashboard");
            }
            else
            {
                alert("Invalid username/password");                
            }
        }).catch(error => {
            alert("Something went wrong. Try again later");
        });


        
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

        </div>
    );
}
 
export default AdminLogin;