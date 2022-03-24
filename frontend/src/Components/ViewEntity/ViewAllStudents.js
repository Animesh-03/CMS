import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ViewAllStudents = () => {
    const navigate = useNavigate();

    const [students,setStudents] = useState([]);
    const [searchName,setSearchName] = useState("");

    //Get all the students by default on page load
    useEffect(() => {
        getAllStudents();
    },[])

    //Gets all the students and stores in students variable
    const getAllStudents = () => {
        axios.get("http://localhost:3000/view/student/all")
            .then(res => {
                setStudents(res.data);
            }).catch(error => {
                alert("Something went wrong. Try again later");
            });
    }
    //Gets all the students with the given name and stores in the students variable
    const getStudentsWithName = (name) => {
        axios.get("http://localhost:3000/view/student/all?name=" + name)
            .then(res => {
                setStudents(res.data);
            }).catch(error => {
                alert("Something went wrong. Try again later");
            })
    }
    //Deletes the student having the student_id
    const deleteStudent = (student_id) => {
        axios.delete("http://localhost:3000/delete/student",{data:{student_id: student_id}})
            .then(res => {
                getAllStudents();
            }).catch(error => {
                alert("Something went wrong deleting the student. Try again later");
            })
    }

    return ( 
        <div className='view-all-students'>
            <form className='student-filter-form'>
                <input className='form-control' placeholder='Enter Name of Student' onChange={(e) => setSearchName(e.target.value)} />
                <button className='student-filter-search-btn' onClick={_ => {getStudentsWithName(searchName)}}>Search</button>
            </form>

            <br/><br />

            <div className='all-students'>
                <h1>All Students</h1>
                {/* Returns a list of all the students present in the students variable */}
                {students.length > 0 ? students.map(st => {
                    return (
                        <div key={st.student_id}>
                            <p id='student-list-item' key={st.student_id} onClick={() => navigate("/view/student/" + st.student_id)}>{st.first_name}-{st.student_id}</p>
                            <button  className='delete-student' onClick={() => deleteStudent(st.student_id)}>Delete</button>
                        </div>
                    )
                }) : <p>Not Found</p>}
            </div>
        </div>
     );
}
 
export default ViewAllStudents;