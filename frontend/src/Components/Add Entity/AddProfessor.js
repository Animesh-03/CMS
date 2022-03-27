import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AddProfessor = () => {
    const navigate = useNavigate();

    const [profID,setProfID] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [fName,setFName] = useState("");
    const [lName,setLName] = useState("");

    const handleSubmit = (e) => {
        //Prevent auto reloading of page
        e.preventDefault();

        axios.post("http://localhost:3000/add/professor",{
            professor_id: profID,
            password: password,
            email: email,
            first_name: fName,
            last_name: lName
            
        }).then(res => {
            navigate(-1);
        }).catch(error => {
            alert("Error adding professor, Try again later");
        });
    }


    return ( 
        <div className='add-professor'>
            <form className='add-professor-form' onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='professor-id' className='form-label'>Professor ID</label>
                <input id='professor-id' className='form-control' typeof='text' placeholder='Enter Professor ID' onChange={(e) => setProfID(e.target.value)} required />

                <label htmlFor='professor-password' className='form-label'>Password</label>
                <input id='professor-password' className='form-control' typeof='text' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />

                <label htmlFor='professor-email' className='form-label'>Email</label>
                <input id='professor-email' className='form-control' typeof='text' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor='professor-first-name' className='form-label'>First Name</label>
                <input id='professor-first-name' className='form-control' typeof='text' placeholder='Enter First Name' onChange={(e) => setFName(e.target.value)} required />

                <label htmlFor='professor-last-name' className='form-label'>Last Name</label>
                <input id='professor-last-name' className='form-control' typeof='text' placeholder='Enter Last Name' onChange={(e) => setLName(e.target.value)} required />

                <button type='submit'>Add Professor</button>
            </form>
        </div>
     );
}
 
export default AddProfessor;