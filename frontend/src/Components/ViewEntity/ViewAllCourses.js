import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const ViewAllCourses = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const [courses,setCourses] = useState([]);
    const [searchName,setSearchName] = useState("");

    useEffect(() => {
        getAllCourses();
    },[])

    const getAllCourses = () => {
        axios.get("http://localhost:3000/view/course/all")
            .then(res => {
                setCourses(res.data);
            }).catch(error => {
                alert("Error getting courses. Try again later");
            });
    }

    const getCoursesWithName = (searchName) => {

        axios.get("http://localhost:3000/view/course/all?name=" + searchName)
            .then(res => {
                setCourses(res.data);
            }).catch(error => {
                alert("Error getting courses with name. Try again later");
            });
    }

    const deleteCourse = (course_id) => {

    }

    return ( 
        <div className='view-all-courses'>
            <form className='course-filter-form' >
                <input className='form-control' placeholder='Enter Name of Course' onChange={(e) => setSearchName(e.target.value)} />
                <button className='course-filter-search-btn' onClick={(e) => {e.preventDefault();getCoursesWithName(searchName)}}>Search</button>
            </form>

            <div className='all-courses'>
                <h2>All Courses</h2>
                {courses.map(c => {
                    return (
                        <div key={c.course_id}>
                            <p onClick={() => navigate("/view/course/" + c.course_id)}>{c.course_name}</p>
                            {user.role === "admin" && <button onClick={() =>deleteCourse(c.course_id)}>Delete</button>}

                        </div>
                    )
                })}
            </div>

        </div>
     );
}
 
export default ViewAllCourses;