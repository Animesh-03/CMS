import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';

const AdminDashboard = () => {
    const {user, isAuth} = useContext(UserContext); //Gets the user and auth variable from User Context
    const navigate = useNavigate();

    const [students,setStudents] = useState([]);
    const [professors,setProfessors] = useState([]);
    const [courses,setCourses] = useState([]);

    useEffect(() => {
        //Get first 5 students
        axios.get("http://localhost:3000/view/student?num=5")
            .then(res => {
                setStudents(res.data);
            }).catch(error => {
                alert("Error getting students. Try again later");
            });

        //Get first 5 professors
        axios.get("http://localhost:3000/view/professor?num=5")
            .then(res => {
                setProfessors(res.data);
            }).catch(error => {
                alert("Error getting professors. Try again later");
            });

        //Get first 5 courses
        axios.get("http://localhost:3000/view/course?num=5")
            .then(res => {
                setCourses(res.data);
            }).catch(error => {
                alert("Error getting courses. Try again later");
            });

    },[])

    return ( 
        <div className='admin-dashboard'>
            <p>Username is {user != null && user.username}</p>
            <p>Authenicated: {isAuth != null && isAuth.toString()}</p>
            <br />
            <div className='students-list'>
                <h2>Students</h2>
                {/*Creates a list of <p> tags with student's first name in them */}
                {students.map((st) => <p id='student-list-item' key={st.student_id} onClick={() => navigate("/view/student/" + st.student_id)}>{st.first_name}-{st.student_id}</p>)}
                <button className='view-all-students' onClick={() => navigate("/view/student/all")}>View All</button>
                <button className="add-student-redirect" onClick={() => navigate("/admin/add/student")}>Add Student</button>
            </div>
            <br /><br />

            <div className='professor-list'>
                <h2>Professors</h2>
                {professors.map(prof => <p key={prof.professor_id} onClick={() => navigate("/view/professor/" + prof.professor_id)} >{prof.first_name}-{prof.professor_id}</p>)}
                <button className='view-all-professors' onClick={() => navigate('/view/professor/all')}>View All</button>
                <button className='add-professor-redirect' onClick={() => navigate("/admin/add/professor")}>Add Professor</button>
            </div>
            <br /><br />

            <div className='course-list'>
                <h2>Courses</h2>
                {courses.map(c => <p key={c.course_id} onClick={() => navigate("/view/course/" + c.course_id)}>{c.course_name}</p>)}
                <button className='view-all-courses' onClick={() => navigate("/view/courses/all")}>View All</button>
                <button className='add-course-redirect' onClick={() => navigate("/admin/add/course")}>Add Course</button>
            </div>
            
        </div>
     );
}
 
export default AdminDashboard;