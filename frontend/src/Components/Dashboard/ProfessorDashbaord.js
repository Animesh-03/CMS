import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const ProfessorDAshboard = () => {
    const {user,loading} = useContext(UserContext);
    const navigate = useNavigate();

    const [icCourses,setICCourses] = useState([]);

    //After context is done loading get all the courses the porf is IC of
    useEffect(() => {
        if(!loading)
        {
            axios.post("http://localhost:3000/view/course/ic",{ic: user.id})
            .then(res => {
                setICCourses(res.data);
            }).catch(error => {
                alert("Error getting your courses. Try again later");
            });
        }
    },[loading,user]);

    return ( 
        <div className='professor-dashboard'>
            <h1>Hello {user != null && user.first_name}</h1>

            {icCourses.length && 
                <div className='professor-courses'>
                    <h2>Your courses</h2>
                    {icCourses.map(c => <p key={c.course_id} onClick={() => navigate("/view/course/" + c.course_id)}>{c.course_name}</p>)}
                </div>
            }
        </div>
     );
}
 
export default ProfessorDAshboard;