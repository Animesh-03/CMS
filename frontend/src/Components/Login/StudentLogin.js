import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const StudentLogin = () => {
    const {loginUser} = useContext(UserContext);
    const navigate = useNavigate();

    const[studentID,setStudentID] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/login/student", {student_id: studentID})
            .then(res => {
                if(res.data.length !== 0 && password === res.data[0].password)
                {
                    const user = {
                        student_id: res.data[0].student_id,
                        first_name: res.data[0].first_name,
                        role: "student"
                    }

                    loginUser(user);
                    navigate("/student/dashboard");
                }
                else
                {
                    alert("Invalid username/password");   
                }
            });
    }

    return ( 
        <div className='student-login-form' onSubmit={handleSubmit}>
            <h1>Student Login</h1>
            
            <form className='student-login-form'>
                <label htmlFor='student-id' className='form-label'>Student ID</label>
                <input id='student-id' className='form-control' placeholder='Enter Student ID' onChange={(e) => setStudentID(e.target.value)} required />

                <label htmlFor='student-password' className='form-label'>Passwprd</label>
                <input id='student-password' className='form-control' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                
                <button type='submit' className='student-login-btn'>Login</button>
            </form>
        </div>
    );
}
 
export default StudentLogin;