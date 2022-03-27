import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const ProfessorLogin = () => {
    const {loginUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [professorID,setProfessorID] = useState('');
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/login/professor",{professor_id: professorID})
            .then(res => {
                if(res.data.length !== 0 && password === res.data[0].password)
                {
                    const user = {
                        id: res.data[0].professor_id,
                        first_name: res.data[0].first_name,
                        role: "professor"
                    }

                    loginUser(user);
                    navigate("/professor/dashboard");
                }
                else
                {
                    alert("Invalid username/password");   
                }
            })
    }

    return ( 
        <div className='professor-login-form'>
            <h1>Professor Login</h1>

            <form className='professor-login-form' onSubmit={handleSubmit}>
                <label htmlFor='professor-id' className='form-label'>Professor ID</label>
                <input id='professor-id' className='form-control' placeholder='Enter Professor ID' onChange={(e) => setProfessorID(e.target.value)} required />

                <label htmlFor='professor-password' className='form-label'>Password</label>
                <input id='professor-password' className='form-control' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />

                <button type='submit' className='professor-login-btn'>Login</button>

            </form>

            </div>

        
    );
}
 
export default ProfessorLogin;