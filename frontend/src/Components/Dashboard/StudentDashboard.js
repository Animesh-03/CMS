import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const StudentDashboard = () => {
    const {user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    const [courses,setCourses] = useState([]);
    const [searchName,setSearchName] = useState('');
    const [registeredSections,setRegisteredSections] = useState([]);

    useEffect(() => {
        getAllCourses();
    },[]);

    useEffect(() => {
       if(!loading) getStudentSections();
    },[loading])

    const getAllCourses = () => {
        axios.get("http://localhost:3000/view/course/all")
            .then(res => {
                setCourses(res.data);
            }).catch(error => {
                alert("Error getting courses. Try again later");
            });
    }

    const getCoursesWithName = (searchName) => {
        // e.preventDefault();

        axios.get("http://localhost:3000/view/course/all?name=" + searchName)
            .then(res => {
                setCourses(res.data);
                console.log(res.data);
            }).catch(error => {
                alert("Error getting courses with name. Try again later");
            });
    }

    const getStudentSections = () => {
        axios.post("http://localhost:3000/student/view/section",{student_id: user.student_id})
            .then(res => {
                setRegisteredSections(res.data);
            }).catch(error => {
                console.log("Error getting sections. Try again later");
            });
    }

    const removeSection = (section_id, course_id) => {
        axios.delete("http://localhost:3000/student/remove/section", {data: {section_id: section_id, course_id: course_id, student_id: user.student_id}})
            .then(res => {
                getStudentSections();
            }).catch(error => {
                alert("Error removing section. Try again later");
            });
    }   


    return ( 
        <div className='student-dashboard'>
            <h1>Hello {user!= null && user.first_name}</h1>

            <form className='course-filter-form' >
                <input className='form-control' placeholder='Enter Name of Course' onChange={(e) => setSearchName(e.target.value)} />
                <button className='course-filter-search-btn' onClick={(e) => {e.preventDefault();getCoursesWithName(searchName)}}>Search</button>
            </form>

            <div className='student-dashboard-courses'>
                {courses.map(c => {
                    return (
                        <div key={c.course_id}>
                            <p onClick={() => navigate("/view/course/" + c.course_id)}>{c.course_name}</p>
                        </div>
                    );
                })}
            </div>

            <div className='student-sections'>
                <h2>Your Sections</h2>
                {registeredSections.length && registeredSections.map(s => {
                    return(
                        <div key={s.section_id + s.course_id}>
                            <p key={s.section_id} onClick={() => navigate("/view/course/section/" + s.section_id,{state:{course_id: s.course_id}})}>{s.course_name} {s.section_id}</p>
                            <button onClick={() => removeSection(s.section_id, s.course_id)}>Remove</button>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default StudentDashboard;