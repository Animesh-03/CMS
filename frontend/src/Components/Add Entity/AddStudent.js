import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';


const AddStudent = () => {

    const navigate = useNavigate();

    const [sid,setSid] = useState("");
    const [password,setPassword] = useState("");
    const [fName,setFName] = useState("");
    const [lName,setLName] = useState("");

    const handleSubmit = (e) => {
        //Prevents page from auto reloading
        e.preventDefault();

        axios.post('http://localhost:3000/add/student', {
            student_id: sid,
            password: password,
            first_name: fName,
            last_name: lName
        }).then(res => {
            navigate(-1);
        }).catch(error => {
            alert("Something went wrong. Try again later");
        })
    }

    return ( 
        <div className='add-student'>
            <h3>Add Student</h3>

            <form className='add-student-form' onSubmit={handleSubmit}>
                <label htmlFor='sid' className='form-label'>Student ID</label>
                <input typeof='text' id='sid' className='form-control' placeholder='Enter Student ID' required onChange={(e) => setSid(e.target.value)} />

                <label htmlFor='student-password' className='form-label'>Password</label>
                <input typeof='text' id='student-password' className='form-control' placeholder='Enter Password' required onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor='student-fName' className='form-label'>First Name</label>
                <input typeof='text' id='student-fName' className='form-control' placeholder='Enter First Name' required onChange={(e) => setFName(e.target.value)} />

                <label htmlFor='student-lName' className='form-label'>Last Name</label>
                <input typeof='text' id='student-lName' className='form-control' placeholder='Enter Last Name' required onChange={(e) => setLName(e.target.value)} />

                <button type='submit'>Add Student</button>

            </form>
        </div>
     );
}
 
export default AddStudent;