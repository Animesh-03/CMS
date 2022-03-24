import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';

const AdminDashboard = () => {
    const {user, isAuth} = useContext(UserContext); //Gets the user and auth variable from User Context
    const navigate = useNavigate();

    const [students,setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/view/student/5")
            .then(res => {
                setStudents(res.data);
            }).catch(error => {
                alert("Error getting students. Try again later");
            })
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
                <button className='view-all-students' onClick={() => navigate("/admin/view/student/all")}>View All</button>
            </div>
            <br /><br />
            <button className="add-student-redirect" onClick={() => navigate("/admin/add/student")}>Add Student</button>
        </div>
     );
}
 
export default AdminDashboard;