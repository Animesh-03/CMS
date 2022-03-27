import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import SelectSearch, { fuzzySearch } from 'react-select-search';

const AddCourse = () => {
    const navigate = useNavigate();

    const [courseID,setCourseID] = useState("");
    const [courseName,setCourseName] = useState("");
    const [ic,setIC] = useState("");
    const [professors,setProfessors] = useState([]);

    //Gets all professors from professors table and arranges them in a list suitable for SelectSearch Component
    useEffect(() => {
        axios.get("http://localhost:3000/view/professor/all")
            .then(res => {
                let profList = [];
                res.data.map(prof => {
                    let obj = {value: prof.professor_id, name: prof.first_name + " " + prof.last_name}
                    profList.push(obj);
                    return 0;
                });

                setProfessors(profList);
            }).catch(error => {
                alert("Error getting professors. Try again later");
            });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //Sends data to backend and goes back once inserted
        axios.post("http://localhost:3000/add/course",{
            course_id: courseID,
            course_name: courseName,
            ic: ic
        }).then(res => {
            navigate(-1);
        }).catch(error => {
            alert("Error adding course. Try again later");
        });

    }

    return ( 
        <div className='add-course'>
            <form className='add-course-form' onSubmit={handleSubmit}>
                <label htmlFor='course-id' className='form-label'>Course ID</label>
                <input type='text' className='form-control' onChange={(e) => setCourseID(e.target.value)} required />

                <label htmlFor='course-name' className='form-label'>Course Name</label>
                <input type='text' className='form-control' onChange={(e) => setCourseName(e.target.value)} required />

                <label htmlFor='ic-select' className='form-label'>Select IC</label>
                <SelectSearch id='ic-select' options={professors} onChange={(val) => setIC(val)} search filterOptions={fuzzySearch} />

                <button type='submit' className='add-course-btn'>Add Course</button>
            </form>
        </div>
     );
}
 
export default AddCourse;
