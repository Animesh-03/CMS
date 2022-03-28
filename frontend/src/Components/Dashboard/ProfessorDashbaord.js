import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Contexts/UserContext';

const ProfessorDAshboard = () => {
    const {user,loading} = useContext(UserContext);
    const navigate = useNavigate();

    const [icCourses,setICCourses] = useState([]);
    const [sections,setSections] = useState([]);

    //After context is done loading get all the courses the prof is IC of and his sections
    useEffect(() => {
        if(!loading)
        {   
            getICCourses();
            getProfessorSections();
        }   
    },[loading,user]);

    const getICCourses = () => {
        axios.post("http://localhost:3000/view/course/ic",{ic: user.id})
            .then(res => {
                setICCourses(res.data);
            }).catch(error => {
                alert("Error getting your courses. Try again later");
            });
    }

    const getProfessorSections = () => {
        axios.post("http://localhost:3000/professor/view/sections", {professor_id: user.id})
            .then(res => {
                setSections(res.data);
            }).catch(error => {
                alert("Error getting sections. Try again later");
            })
    }

    return ( 
        <div className='professor-dashboard'>
            <h1>Hello {user != null && user.first_name}</h1>

            {icCourses.length && 
                <div className='professor-courses'>
                    <h2>Your Courses</h2>
                    {icCourses.map(c => <p key={c.course_id} onClick={() => navigate("/view/course/" + c.course_id)}>{c.course_name}</p>)}
                </div>
            }


            <div className='professor-sections'>
                <h2>Your Sections</h2>

                {sections.length > 0 ? 
                    sections.map(s => {
                        return (
                            <div key={s.section_id + s.course_id}>
                                <p key={s.section_id} onClick={() => navigate("/view/course/section/" + s.section_id,{state:{course_id: s.course_id}})}>{s.course_name} {s.section_id}</p>
                            </div>
                        );
                    } )
                    : <p>No Sections found</p>    
                }
            </div>
        </div>
     );
}
 
export default ProfessorDAshboard;